const express = require("express");
const router = express.Router();
const db = require("../config/db");

// POST /book_spot — book a parking spot for a user
router.post("/book_spot", async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.status(400).json({ message: "Missing userId" });

        const parkingRef = db.collection("parking");
        const snapshot = await parkingRef.get();

        if (snapshot.empty) {
            return res
                .status(404)
                .json({ message: "No parking documents found" });
        }

        const doc = snapshot.docs[0];
        const docRef = parkingRef.doc(doc.id);
        const data = doc.data();

        let { availableCount, slotStatusArray } = data;

        if (!Array.isArray(slotStatusArray) || slotStatusArray.length === 0) {
            return res.status(400).json({ message: "Invalid slot data" });
        }

        const availableIndex = slotStatusArray.findIndex(
            (status) => status === true
        );

        if (availableIndex === -1) {
            return res.json({
                availableCount,
                availableIndex: null,
                message: "No available slots currently",
            });
        }

        // Mark slot as booked
        slotStatusArray[availableIndex] = false;
        const updatedAvailableCount = Math.max(availableCount - 1, 0);

        // Save booking timestamp for user in Firestore
        await db.collection("userBookings").doc(userId).set({
            slotIndex: availableIndex,
            bookedAt: new Date().toISOString(),
        });

        await docRef.update({
            availableCount: updatedAvailableCount,
            slotStatusArray,
        });

        return res.json({
            availableCount: updatedAvailableCount,
            availableIndex,
            message: `Slot ${availableIndex} booked successfully`,
        });
    } catch (error) {
        console.error("Error booking parking spot:", error);
        res.status(500).json({ message: "Error booking parking spot" });
    }
});

// POST /leave_spot — user leaves parking, calculate amount
router.post("/leave_spot", async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.status(400).json({ message: "Missing userId" });

        const userDoc = await db.collection("userBookings").doc(userId).get();
        if (!userDoc.exists) {
            return res
                .status(404)
                .json({ message: "No active booking found for user" });
        }

        const { slotIndex, bookedAt } = userDoc.data();
        const durationMs = new Date() - new Date(bookedAt);
        const durationHours = durationMs / (1000 * 60 * 60);
        const ratePerHour = 50; // example rate
        const amount = Math.ceil(durationHours * ratePerHour);

        // Free up the slot
        const parkingRef = db.collection("parking");
        const snapshot = await parkingRef.get();
        if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            const docRef = parkingRef.doc(doc.id);
            const data = doc.data();
            let { slotStatusArray, availableCount } = data;

            slotStatusArray[slotIndex] = true;
            const updatedAvailableCount = availableCount + 1;

            await docRef.update({
                slotStatusArray,
                availableCount: updatedAvailableCount,
            });
        }

        // Delete user's booking
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
