const { ObjectID } = require('bson');
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
  const users = await db.collection('users').find({}, { password: 0 } ).toArray();
  users.forEach((user) => delete user.password)
  return { statusCode: 200, users };
};

const getUserById = async (id) => {
  if (!ObjectID.isValid(id)) return { statusCode: 404, user: null };
  const db = await connect();
  const user = await db.collection('users').findOne({ _id: ObjectID(id) });
  delete(user.password);
  return { statusCode: 200, user };
}

const updateUser = async (userDetails) => {
  const { id, name, email, password, avatar, role } = userDetails;
  if (!ObjectID.isValid(id)) return { statusCode: 404, user: null };
  const db = await connect();
  await db.collection('users')
    .updateOne({ _id: ObjectID(id) },
    { $set: { name, email, password, avatar, role } });
  user = { id, name, email, avatar, role };
  return { statusCode: 200, user };
}

const removeUser = async (id) => {
  if (!ObjectID(id)) return { statusCode: 404, task: null };
  const db = await connect();
  await db.collection('users').deleteOne({ _id: ObjectID(id) });
  return { statusCode: 204 };
}

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
  getUserById,
  updateUser,
  removeUser,
};
