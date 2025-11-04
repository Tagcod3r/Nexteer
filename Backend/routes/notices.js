const express = require("express");
const router = express.Router();

// Placeholder notices routes
router.get("/", (req, res) => {
	res.json({ message: "Notices route is up" });
});

module.exports = router;


