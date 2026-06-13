const express = require("express");
const router = express.Router();

const {
  createJob,
  getJobs,
  applyJob,
  getApplications
} = require("../controllers/jobController");

const { protect } = require("../middleware/authMiddleware");
const roleCheck = require("../middleware/roleMiddleware");

// CREATE JOB (admin only)
router.post("/", protect, roleCheck("admin"), createJob);

// GET JOBS (all users)
router.get("/", protect, getJobs);

// APPLY JOB (student only)
router.post("/apply", protect, roleCheck("student"), applyJob);

// VIEW APPLICATIONS (admin only)
router.get("/applications", protect, roleCheck("admin"), getApplications);

module.exports = router;