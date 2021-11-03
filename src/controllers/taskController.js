const taskService = require('../services/taskService');

const createTask = async (req, res) => {
  const data = req.body;
  const { authorization } = req.headers;
  const { _id: userId } = req.user;
  const { statusCode, message, task } = await taskService.createTask(data, userId, authorization);
  if (message) return res.status(statusCode).json({ message });
  return res.status(statusCode).json({ task });
};

const getTasks = async (_req, res) => {
  const { statusCode, tasks } = await taskService.getTasks();
  return res.status(statusCode).json(tasks);
}

module.exports = {
  createTask,
  getTasks,
};
