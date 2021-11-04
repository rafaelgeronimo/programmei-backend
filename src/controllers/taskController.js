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
};

const getTaskById = async (req, res) => {
  const { statusCode, task } = await taskService.getTaskById(req.params.id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.status(statusCode).json(task);
};

const getTasksByUserId = async (req, res) => {
  const { statusCode, tasks } = await taskService.getTasksByUserId(req.params.id);
  if (!tasks) {
    return res.status(404).json({ message: 'Tasks not found' });
  }
  res.status(statusCode).json(tasks);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, initialDate, endDate, taskStatus } = req.body;
  const taskDetails = ({ id, title, description, initialDate, endDate, taskStatus });
  const { statusCode, task } = await taskService.updateTask(taskDetails);
  res.status(statusCode).json(task);
};

const removeTask = async (req, res) => {
  const { statusCode } = await taskService.removeTask(req.params.id);
  res.status(statusCode).json({});
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  removeTask,
  getTasksByUserId,
};
