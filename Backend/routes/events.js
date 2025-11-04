const express = require("express");
const router = express.Router();

// Placeholder events routes
router.get("/", (req, res) => {
	res.json({ message: "Events route is up" });
});

module.exports = router;


