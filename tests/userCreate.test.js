const frisby = require('frisby');
const { MongoClient } = require('mongodb');

const mongodbUrl = 'mongodb://localhost:27017/programmei';
const url = 'http://localhost:3000';

describe('Cadastra um novo usuário', () => {
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

  it('Será validado que o campo `name` é obrigatório', async () => {
    await frisby
      .post(`${url}/users`,
      {
        email: 'user@email.com',
        password: 'password@123',
        avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        role: 'user',
      })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid entries. Try again.');
      });
  });

  it('Será validado que o campo `email` é obrigatório', async () => {
    await frisby
      .post(`${url}/users`,
      {
        name: 'User Name',
        password: 'password@123',
        avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        role: 'user',
      })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid entries. Try again.');
      });
  });

  it('Será validado que não é possível cadastrar usuário com o campo `email` inválido', async () => {
    await frisby
      .post(`${url}/users/`,
      {
        name: 'User Name',
        email: 'username',
        password: 'password@123',
        avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        role: 'user',
      })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid entries. Try again.');
      });
  });

  it('Será validado que o campo `senha` é obrigatório', async () => {
    await frisby
      .post(`${url}/users/`,
      {
        name: 'User Name',
        email: 'user@email.com',
        avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        role: 'user',
      })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid entries. Try again.');
      });
  });

  it('Será validado que o campo `role` é obrigatório', async () => {
    await frisby
      .post(`${url}/users/`, {
        name: 'User name',
        email: 'user@email.com',
        avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid entries. Try again.');
      });
  });

  it('Será validado que o campo `email` é único', async () => {
    await frisby
      .post(`${url}/users/`,
      {
        name: 'User Name',
        email: 'user@email.com',
        password: 'password@123',
        avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        role: 'user',
      })
      .expect('status', 201)

      await frisby
        .post(`${url}/users/`,
        {
          name: 'User Name',
          email: 'user@email.com',
          password: 'password@123',
          avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
          role: 'user',
        })
        .expect('status', 409)
        .then((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result.message).toBe('Email already registered');
        });
  });

  it('Será validado que não é possível cadastrar um usuário com token inválido', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '12346',
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/users/`,
      {
        name: 'User Name',
        email: 'user@email.com',
        password: 'password@123',
        avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        role: 'user',
      })
      .expect('status', 401)
      .then((responseLogin) => {
        const { json } = responseLogin;
        expect(json.message).toBe('jwt malformed')
      });
  });

  it('Será validado que só é possível cadastrar usuário se for admin', async () => {
    await frisby
      .post(`${url}/login`, {
        email: 'admin@email.com',
        password: 'admin',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: result.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/users/`,
          {
            name: 'User Name',
            email: 'user@email.com',
            password: 'password@123',
            avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
            role: 'user',
          })
          .expect('status', 201);
      });
  });

  it('Será validado que é possível cadastrar usuário com sucesso', async () => {
    await frisby
      .post(`${url}/users/`,
      {
        name: 'User Name',
        email: 'user@email.com',
        password: 'password@123',
        avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        role: 'user',
      })
      .expect('status', 201)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.user.name).toBe('User Name');
        expect(result.user.email).toBe('user@email.com');
        expect(result.user.avatar).toBe('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
      });
  });
});
