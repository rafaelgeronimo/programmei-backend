const jwt = require('jsonwebtoken');
const validationSchema = require('../helpers/validationSchema');
const taskModel = require('../models/taskModel');

const { JWT_TOKEN } = process.env;

const createTask = async (data, userId) => {
  const { error } = validationSchema.taskSchema.validate(data);
  if (error) return { statusCode: 400, message: error.details[0].message };
  const { statusCode, task } = await taskModel.createTask(data, userId);
  return { statusCode, task };
};

const getTasks = async () => {
  const { statusCode, tasks} = await taskModel.getTasks();
  return ({ statusCode, tasks });
}

module.exports = {
  createTask,
  getTasks,
};
