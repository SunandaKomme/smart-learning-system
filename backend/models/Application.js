const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job"
  },

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  resumeLink: {
    type: String
  },

  status: {
    type: String,
    enum: ["applied", "selected", "rejected"],
    default: "applied"
  }
}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);