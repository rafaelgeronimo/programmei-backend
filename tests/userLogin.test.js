const { expect } = require('chai');
const frisby = require('frisby');
const { MongoClient } = require('mongodb');

const mongodbUrl = 'mongodb://localhost:27017/programmei';
const url = 'http://localhost:3000';

describe('Realiza login de usuário', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongodbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('programmei');
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany({});
    await db.collection('tasks').deleteMany({});
    const users = {
      name: 'admin', email: 'admin@email.com', password: 'admin', role: 'admin'
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
        expect(result.message).toBe('All fields must be filled');
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
        expect(result.message).toBe('All fields must be filled');
      });
  });

  it('Será validado que não é possível fazer login com um `email` inválido', async () => {
    await frisby
      .post(`${url}/login/`,
      {
        email: 'user@0.com',
        password: 'password@123',
      })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Incorrect username or password');
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
        expect(result.message).toBe('Incorrect username or password');
      });
  });

  it('Será validado que é possível fazer login com sucesso', async () => {
    await frisby
      .post(`${url}/users/`,
      {
        email: 'user@email.com',
        password: 'password@123',
      })
      .expect('status', 201)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return frisby
          .post(`${url}/login/`,
          {
            email: result.user.email,
            password: 'password@123',
          })
          .expect('status', 200)
          .then((responseLogin) => {
            const { json } = responseLogin;
            expect(json.token).not.toBeNull();
          });
      });
  });
});
