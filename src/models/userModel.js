const connect = require('./connection');

const err = true;

const createUser = async (name, email, password, avatar, role) => {
  const db = await connect();
  const findUser = await db.collection('users').findOne(email);
  if (findUser) return { statusCode: 400, message: 'Usuário já cadastrado' };
  await db.collection('users').insertOne(name, email, password, avatar, role);
  return { statusCode: 200, message: 'Usuário criado com sucesso' };
  // return { _id: userCreated.insertedId, name, email, password, role };
};

module.exports = {
  createUser,
};
