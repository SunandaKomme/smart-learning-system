const express = require("express");
const router = express.Router();

const {
  createCourse,
  getCourses,
  deleteCourse
} = require("../controllers/courseController");

const { protect } = require("../middleware/authMiddleware");
const roleCheck = require("../middleware/roleMiddleware");

// CREATE COURSE (only admin/trainer)
router.post(
  "/",
  protect,
  roleCheck("admin", "trainer"),
  createCourse
);

// GET COURSES (everyone logged in)
router.get("/", protect, getCourses);

// DELETE COURSE (only admin)
router.delete(
  "/:id",
  protect,
  roleCheck("admin"),
  deleteCourse
);

module.exports = router;