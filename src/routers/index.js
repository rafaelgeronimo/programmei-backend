const userRouter = require('./userRouter');
const loginRouter = require('./loginRouter');

const authMiddleware = require('../middlewares/authMiddleware');

module.exports = {
  authMiddleware,
  userRouter,
  loginRouter,
};
