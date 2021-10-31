const frisby = require('frisby');
const { MongoClient } = require('mongodb');

const mongodbUrl = 'mongodb://localhost:27017/today';
const url = 'http://localhost:3000';

describe('Cadastra uma nova tarefa', () => {
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

  it('Será validado que não é possível cadastrar tarefa sem o campo `title`', async () => {
    await frisby
      .post(`${url}/login/`, {
        email: 'admin@email.com',
        password: 'admin1',
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
          .post(`${url}/tasks/`, {
            description: 'Desenvolver o frontend da página de login para o novo sistema da Ebyrt',
            initialDate: '30/10/2021',
            endDate: '05/11/2021',
            taskDone: false,
          })
          .expect('status', 400)
          .then((response) => {
            const { body } = response;
            const result = JSON.parse(body);
            expect(result.message).toBe('"title" is required');
          });
      });
  });

  it('Será validado que não é possível cadastrar tarefa com token inválido', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '12345678',
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/tasks/`, {
        title: 'Criar página de login',
        description: 'Desenvolver o frontend da página de login para o novo sistema da Ebyrt',
        initialDate: '30/10/2021',
        endDate: '05/11/2021',
        taskDone: false,
      })
      .expect('status', 401)
      .then((responseLogin) => {
        const { json } = responseLogin;
        expect(json.message).toBe('jwt malformed');
      });
  });

  it('Será validado que é possível cadastar uma tarefa com sucesso', async () => {
    await frisby
      .post(`${url}/login/`, {
        email: 'admin@email.com',
        password: 'admin1',
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
          .post(`${url}/tasks/`, {
            title: 'Criar página de login',
            description: 'Desenvolver o frontend da página de login para o novo sistema da Ebyrt',
            initialDate: '2021/10/30',
            endDate: '2021/11/05',
            taskDone: false,
          })
          .expect('status', 201)
          .then((responseLogin) => {
            const { json } = responseLogin;
            expect(json.task).toHaveProperty('_id');
            expect(json.task.title).toBe('Criar página de login');
            expect(json.task.description).toBe('Desenvolver o frontend da página de login para o novo sistema da Ebyrt');
          });
      });
  });
});
