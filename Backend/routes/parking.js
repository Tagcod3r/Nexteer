const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Helper to get the latest parking session
async function getLatestParkingSession() {
    const parkingRef = db.collection("parking");
    const snapshot = await parkingRef
        .orderBy("sessionStartedAt", "desc")
        .limit(1)
        .get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return { docRef: parkingRef.doc(doc.id), data: doc.data() };
}

// Helper to find available slots based on vehicle type
function findAvailableSlots(slotStatusArray, vehicleType) {
    const requiredSlots = vehicleType === "truck" ? 3 : 1;

    for (let i = 0; i <= slotStatusArray.length - requiredSlots; i++) {
        let allAvailable = true;
        for (let j = 0; j < requiredSlots; j++) {
            if (!slotStatusArray[i + j]) {
                allAvailable = false;
                break;
            }
        }
        if (allAvailable) {
            return Array.from({ length: requiredSlots }, (_, k) => i + k);
        }
    }
    return [];
}

// POST /book_spot
router.post("/book_spot", async (req, res) => {
    try {
        const { userId, vehicleType } = req.body;
        if (!userId || !vehicleType)
            return res
                .status(400)
                .json({ message: "Missing userId or vehicleType" });

        const latestSession = await getLatestParkingSession();
        if (!latestSession)
            return res
                .status(404)
                .json({ message: "No parking sessions found" });

        const { docRef, data } = latestSession;
        let { availableCount, slotStatusArray } = data;

        if (!Array.isArray(slotStatusArray) || slotStatusArray.length === 0) {
            return res.status(400).json({ message: "Invalid slot data" });
        }

        const assignedSlots = findAvailableSlots(slotStatusArray, vehicleType);

        if (assignedSlots.length === 0) {
            return res.json({
                availableCount,
                assignedSlots: [],
                message: "No available slots for your vehicle type currently",
            });
        }

        // Mark slots as booked
        assignedSlots.forEach((index) => (slotStatusArray[index] = false));
        const updatedAvailableCount = Math.max(
            availableCount - assignedSlots.length,
            0
        );

        await db.collection("userBookings").doc(userId).set({
            assignedSlots,
            vehicleType,
            bookedAt: new Date().toISOString(),
            sessionId: docRef.id,
        });

        await docRef.update({
            availableCount: updatedAvailableCount,
            slotStatusArray,
        });

        return res.json({
            availableCount: updatedAvailableCount,
            assignedSlots,
            message: `${vehicleType} booked successfully`,
        });
    } catch (error) {
        console.error("Error booking parking spot:", error);
        res.status(500).json({ message: "Error booking parking spot" });
    }
});

// POST /leave_spot
router.post("/leave_spot", async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.status(400).json({ message: "Missing userId" });

        const userDoc = await db.collection("userBookings").doc(userId).get();
        if (!userDoc.exists)
            return res
                .status(404)
                .json({ message: "No active booking found for user" });

        const { assignedSlots, bookedAt, sessionId } = userDoc.data();
        const durationMs = new Date() - new Date(bookedAt);
        const durationHours = durationMs / (1000 * 60 * 60);

        const ratePerHour = 50; // per slot rate
        const amount = Math.max(
            Math.ceil(durationHours * ratePerHour * assignedSlots.length),
            assignedSlots.length * 50
        );

        const sessionRef = db.collection("parking").doc(sessionId);
        const sessionDoc = await sessionRef.get();
        if (sessionDoc.exists) {
            const { slotStatusArray, availableCount } = sessionDoc.data();
            assignedSlots.forEach((index) => (slotStatusArray[index] = true));
            const updatedAvailableCount = availableCount + assignedSlots.length;

            await sessionRef.update({
                slotStatusArray,
                availableCount: updatedAvailableCount,
            });
        }

        await db.collection("userBookings").doc(userId).delete();

        return res.json({
            amount,
            message: `Parking left. Amount: ₹${amount}`,
        });
    } catch (error) {
        console.error("Error leaving parking spot:", error);
        res.status(500).json({ message: "Error leaving parking spot" });
    }
});

module.exports = router;
