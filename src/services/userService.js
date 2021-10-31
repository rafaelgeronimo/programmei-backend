// const jwt = require('jsonwebtoken');
const validationSchema = require('../helpers/validationSchema');
const userModel = require('../models/userModel');

// const { JWT_SECRET } = process.env;

const createUser = async (data) => {
  const { error } = validationSchema.userSchema.validate(data);
  if (error) return { statusCode: 400, message: error.details[0].message };
  const { statusCode, message } = await userModel.createUser(data);
  return { statusCode, message };
};

module.exports = {
  createUser,
};
