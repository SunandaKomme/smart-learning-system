const express = require("express");
const router = express.Router();

const {
  createAssignment,
  getAssignments
} = require("../controllers/assignmentController");

const {
  submitAssignment,
  getSubmissions,
  updateSubmissionStatus
} = require("../controllers/submissionController");

const { protect } = require("../middleware/authMiddleware");
const roleCheck = require("../middleware/roleMiddleware");

// CREATE ASSIGNMENT (trainer/admin)
router.post("/", protect, roleCheck("admin", "trainer"), createAssignment);

// GET ASSIGNMENTS (all logged in users)
router.get("/", protect, getAssignments);

// SUBMIT ASSIGNMENT (student)
router.post("/submit", protect, roleCheck("student"), submitAssignment);

// GET SUBMISSIONS (trainer/admin)
router.get("/submissions", protect, roleCheck("admin", "trainer"), getSubmissions);

// UPDATE STATUS
router.put("/submission/:id", protect, roleCheck("admin", "trainer"), updateSubmissionStatus);

module.exports = router;