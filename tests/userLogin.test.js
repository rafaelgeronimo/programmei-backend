const frisby = require('frisby');
const { MongoClient } = require('mongodb');

const mongodbUrl = 'mongodb://localhost:27017/today';
const url = 'http://localhost:3000';

describe('Realiza login de usuário', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongodbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('today');
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany({});
    await db.collection('tasks').deleteMany({});
    const users = {
      name: 'admin', email: 'admin@email.com', password: 'admin1', role: 'admin'
    };
    await db.collection('users').insertOne(users);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Será validado que o campo `email` é obrigatório', async () => {
    await frisby
      .post(`${url}/login/`,
      {
        password: 'password@123',
      })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('"email" is required');
      });
  });

  it('Será validado que o campo `password` é obrigatório', async () => {
    await frisby
      .post(`${url}/login/`,
      {
        email: 'user@email.com',
      })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('"password" is required');
      });
  });

  it('Será validado que não é possível fazer login com um `email` inválido', async () => {
    await frisby
      .post(`${url}/login/`,
      {
        email: 'user@.com',
        password: 'password@123',
      })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('"email" must be a valid email');
      });
  });

  it('Será validado que não é possível fazer login com uma senha inválida', async () => {
    await frisby
      .post(`${url}/login/`,
      {
        email: 'user@email.com',
        password: '123',
      })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('"password" length must be at least 6 characters long');
      });
  });

  it('Será validado que é possível fazer login com sucesso', async () => {
    await frisby
      .post(`${url}/login`,
      {
        email: 'admin@email.com',
        password: 'admin1',
      })
      .expect('status', 200)
      .then((responseLogin) => {
        const { json } = responseLogin;
        expect(json.token).not.toBeNull();
      });
  });
});
