const Submission = require("../models/Submission");

exports.submitAssignment = async (req, res) => {
  try {
    const submission = await Submission.create({
      assignmentId: req.body.assignmentId,
      studentId: req.user.id,
      answer: req.body.answer
    });

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate("studentId", "name email")
      .populate("assignmentId", "title");

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSubmissionStatus = async (req, res) => {
  try {
    const updated = await Submission.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};