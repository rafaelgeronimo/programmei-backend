const jwt = require('jsonwebtoken');
const validationSchema = require('../helpers/validationSchema');
const userModel = require('../models/userModel');

const { JWT_SECRET } = process.env;

const createUser = async (data) => {
  const { error } = validationSchema.userSchema.validate(data);
  if (error) return { statusCode: 400, message: error.details[0].message };
  const { statusCode, message } = await userModel.createUser(data);  
  return { statusCode, message };
};

const userLogin = async (data) => {
  const { error } = validationSchema.loginSchema.validate(data);
  if (error) return { statusCode: 400, message: error.details[0].message };
  const { statusCode, message, findUser } = await userModel.userLogin(data);
  if (findUser) {
    const { password: _, ...userPayload } = findUser;
    const token = jwt.sign(userPayload, JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: '30d',
    });
    return ({ statusCode, message, token });
  }
  return ({ statusCode, message });
}

module.exports = {
  createUser,
  userLogin,
};
