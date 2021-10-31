const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  avatar: Joi.string(),
  role: Joi.string(),
});

module.exports = {
  userSchema,
};
