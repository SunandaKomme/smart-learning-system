const Job = require("../models/Job");
const Application = require("../models/Application");

// CREATE JOB
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({
      title: req.body.title,
      company: req.body.company,
      description: req.body.description,
      postedBy: req.user.id
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.applyJob = async (req, res) => {
  try {
    const application = await Application.create({
      jobId: req.body.jobId,
      studentId: req.user.id,
      resumeLink: req.body.resumeLink
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const apps = await Application.find()
      .populate("studentId", "name email")
      .populate("jobId", "title company");

    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};