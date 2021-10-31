const validationSchema = require('../helpers/validationSchema');
const taskModel = require('../models/taskModel');

const createTask = async (data) => {
  const { error } = validationSchema.taskSchema.validate(data);
  if (error) return { statusCode: 400, message: error.details[0].message };
  const { statusCode, task } = await taskModel.createTask(data);
  return { statusCode, task };
};

module.exports = {
  createTask,
};
