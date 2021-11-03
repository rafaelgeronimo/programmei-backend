const userService = require('../services/userService');

const createUser = async (req, res) => {
  const data = req.body;
  const { statusCode, message } = await userService.createUser(data);
  res.status(statusCode).json({ message });
};

const getAllUsers = async (_req, res) => {
  const { statusCode, users } = await userService.getAllUsers();
  res.status(statusCode).json(users);
};

const getUserById = async (req, res) => {
  const { statusCode, user } = await userService.getUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(statusCode).json(user);
}

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, avatar, role } = req.body;
  const userDetails = ({ id, name, email, password, avatar, role });
  const { statusCode, user } = await userService.updateUser(userDetails);
  res.status(statusCode).json(user);
}

const removeUser = async (req, res) => {
  const { statusCode } = await userService.removeUser(req.params.id);
  res.status(statusCode).json({});
}

const userLogin = async (req, res) => {
  const data = req.body;
  const { statusCode, message, user, token } = await userService.userLogin(data);
  res.status(statusCode).json({ message, user, token });
};

module.exports = {
  createUser,
  userLogin,
  getAllUsers,
  getUserById,
  updateUser,
  removeUser,
};
