const Joi = require('joi');
// const dayjs = require('dayjs');

const userSchema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  avatar: Joi.string(),
  role: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  // initialDate: Joi.date().default(() => dayjs().format('DD/MM/YYYY')),
  initialDate: Joi.date(),
  endDate: Joi.date(),
  taskDone: Joi.bool().required(),
});

module.exports = {
  userSchema,
  loginSchema,
  taskSchema,
};
