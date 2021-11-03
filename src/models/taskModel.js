const { ObjectID } = require('bson');
const connect = require('./connection');

const createTask = async ({ title, description, initialDate, endDate, taskStatus }, userId) => {
  const db = await connect();
  const taskCreated = await db.collection('tasks')
    .insertOne({ title, description, initialDate, endDate, taskStatus, userId });
  const task = ({ id: taskCreated.insertedId, title, description, initialDate, endDate, taskStatus, userId });
  return { statusCode: 201, task };
};

const getTasks = async () => {
  const db = await connect();
  const tasks = await db.collection('tasks').find({}).toArray();
  return { statusCode: 200, tasks};
}

const getTaskById = async (id) => {
  if (!ObjectID.isValid(id)) return { statusCode: 404, task: null };
  const db = await connect();
  const task = await db.collection('tasks').findOne({ _id: ObjectID(id) });
  return { statusCode: 200, task };
}

module.exports = {
  createTask,
  getTasks,
  getTaskById,
};
