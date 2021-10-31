const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'missing auth token' });
    }
    const { email } = jwt.verify(token, JWT_SECRET);
    const user = await userModel.verifyEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'user not found'});
    }
    req.user = user;
    next();
  } catch (_e) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};
