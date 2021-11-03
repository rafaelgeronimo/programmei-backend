const connect = require('./connection');

const createTask = async ({ title, description, initialDate, endDate, taskDone }, userId) => {
  const db = await connect();
  const taskCreated = await db.collection('tasks')
    .insertOne({ title, description, initialDate, endDate, taskDone, userId });
  const task = ({ id: taskCreated.insertedId, title, description, initialDate, endDate, taskDone, userId });
  return { statusCode: 201, task };
};

const getTasks = async () => {
  const db = await connect();
  const tasks = await db.collection('tasks').find({}).toArray();
  return { statusCode: 200, tasks};
}

module.exports = {
  createTask,
  getTasks,
};
