const userService = require('../services/userService');

const createUser = async (req, res) => {
  const data = req.body;
  const { statusCode, message } = await userService.createUser(data);
  return res.status(statusCode).json({ message });
};

const getAllUsers = async (_req, res) => {
  const { statusCode, users } = await userService.getAllUsers();
  res.status(statusCode).json(users);
};

const userLogin = async (req, res) => {
  const data = req.body;
  const { statusCode, message, user, token } = await userService.userLogin(data);
  return res.status(statusCode).json({ message, user, token });
};

module.exports = {
  createUser,
  userLogin,
  getAllUsers,
};
