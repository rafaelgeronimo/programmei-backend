const connect = require('./connection');

const createUser = async ({ name, email, password, avatar, role }) => {
  const db = await connect();
  const findUser = await db.collection('users').findOne({ email });
  if (findUser) return { statusCode: 409, message: 'Email already registered' };
  await db.collection('users').insertOne({ name, email, password, avatar, role });
  return { statusCode: 201, message: 'User created successfully' };
};

const getAllUsers = async () => {
  const db = await connect();
  const users = await db.collection('users').find({}).toArray();
  return { statusCode: 200, users };
};

const userLogin = async ({ email, password }) => {
  const db = await connect();
  const findUser = await db.collection('users').findOne({ email });
  if (!findUser) return { statusCode: 400, message: 'User does not exist' };
  if (findUser.password !== password) return { statusCode: 400, message: 'Wrong email or password' };
  return { statusCode: 200, message: 'Login successfully', findUser };
};

const verifyEmail = async (email) => {
  const db = await connect();
  const userData = await db.collection('users').findOne({ email });
  return userData;
};

module.exports = {
  createUser,
  userLogin,
  verifyEmail,
  getAllUsers,
};
