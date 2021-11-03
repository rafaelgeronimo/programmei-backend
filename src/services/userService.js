const jwt = require('jsonwebtoken');
const validationSchema = require('../helpers/validationSchema');
const userModel = require('../models/userModel');

const { JWT_SECRET } = process.env;

const createUser = async (data) => {
  const { error } = validationSchema.userSchema.validate(data);
  if (error) return { statusCode: 400, message: error.details[0].message };
  return { statusCode, message } = await userModel.createUser(data);
};

const getAllUsers = async () => {
  return { statusCode, users} = await userModel.getAllUsers();
};

const getUserById = async (id) => {
  return { statusCode, user } = await userModel.getUserById(id);
};

const updateUser = async (userDetails) => {
  return { statusCode, user } = await userModel.updateUser(userDetails);
};

const removeUser = async (id) => {
  return { statusCode } = await userModel.removeUser(id);
}

const userLogin = async (data) => {
  const { error } = validationSchema.loginSchema.validate(data);
  if (error) return { statusCode: 401, message: error.details[0].message };
  const { statusCode, message, findUser } = await userModel.userLogin(data);
  if (findUser) {
    const { name, email, role, avatar } = findUser;
    const user = ({ name, email, avatar, role });
    const { password: _, ...userPayload } = findUser;
    const token = jwt.sign(userPayload, JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: '16h',
    });
    return ({ statusCode, message, user , token });
  }
  return ({ statusCode, message });
};

module.exports = {
  createUser,
  userLogin,
  getAllUsers,
  getUserById,
  updateUser,
  removeUser,
};
