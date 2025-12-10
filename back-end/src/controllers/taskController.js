const Task = require("../models/Task");

const getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.user.role == "admin") {
      tasks = await Task.find().populate("userId", "name email");
    } else {
      tasks = await Task.find({ userId: req.user._id });
    }
    res.status(200).json({
      success: true,
      message: "tasks fetched",
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while fetching tasks",
      error: error.message,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "please provide title and description",
      });
    }
    const task = await Task.create({
      title,
      description,
      status: status,
      userId: req.user._id,
    });
    res.status(201).json({
      success: true,
      message: "task created successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while creating task",
      error: error.message,
    });
  }
};

module.exports = {
  getTasks,
  createTask,
};
