const connect = require('./connection');

const createTask = async ({ title, description, initialDate, endDate, done }) => {
  const db = await connect();
  const taskCreated = await db.collection('tasks')
    .insertOne({ title, description, initialDate, endDate, done});
  const task = ({ _id: taskCreated.insertedId, title, description, initialDate, endDate, done });
  return { statusCode: 201, task };
};

module.exports = {
  createTask,
};
