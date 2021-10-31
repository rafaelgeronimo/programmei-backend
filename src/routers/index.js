const userRouter = require('./userRouter');
const loginRouter = require('./loginRouter');
const taskRouter = require('./taskRouter');

const authMiddleware = require('../middlewares/authMiddleware');

module.exports = {
  authMiddleware,
  userRouter,
  loginRouter,
  taskRouter,
};
