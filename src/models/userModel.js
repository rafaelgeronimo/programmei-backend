const connect = require('./connection');

const createUser = async ({ name, email, password, avatar, role }) => {
  const db = await connect();
  const findUser = await db.collection('users').findOne({ email });
  if (findUser) return { statusCode: 400, message: 'Usuário já cadastrado' };
  await db.collection('users').insertOne({ name, email, password, avatar, role });
  return { statusCode: 200, message: 'Usuário criado com sucesso' };
};

const userLogin = async ({ email, password }) => {
  const db = await connect();
  const findUser = await db.collection('users').findOne({ email });
  if (!findUser) return { statusCode: 400, message: 'Conta de usuário não existe' };
  if (findUser.password !== password) return { statusCode: 400, message: 'Usuário ou senha incorreto' };
  return { statusCode: 200, message: 'Login realizado com sucesso', findUser };
}

module.exports = {
  createUser,
  userLogin,
};
