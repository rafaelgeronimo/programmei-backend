const taskService = require('../services/taskService');

const createTask = async (req, res) => {
  const data = req.body;
  const { statusCode, message, task } = await taskService.createTask(data);
  if (message) return res.status(statusCode).json({ message });
  return res.status(statusCode).json({ task });
};

module.exports = {
  createTask,
};
