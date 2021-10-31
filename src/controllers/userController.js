const userService = require('../services/userService');

const createUser = async (req, res) => {
  const data = req.body;
  const { statusCode, message, user } = await userService.createUser(data);
  if (message) return res.status(statusCode).json({ message });
  return res.status(statusCode).json({ user });
};

module.exports = {
  createUser,
};
