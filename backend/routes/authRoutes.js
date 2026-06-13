const express = require("express");
const router = express.Router();
const { register, login, updateProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);

// Get profile
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Profile accessed successfully",
    user: req.user
  });
});

// Update profile
router.put("/profile", protect, updateProfile);

module.exports = router;