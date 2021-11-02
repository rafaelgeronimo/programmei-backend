require('dotenv/config');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const FRONTEND_PORT = process.env.FRONTEND_PORT;

const { authMiddleware ,userRouter, loginRouter, taskRouter } = require('./routers');

const corsOptions = {
  origin: `http://localhost:${FRONTEND_PORT}`,
};

app.use(cors(corsOptions));

// ---------- USER ---------- //
app.use('/users', authMiddleware, userRouter);

// ---------- LOGIN ---------- //
app.use('/login', loginRouter);

// ---------- TASKS ---------- //
app.use('/tasks', authMiddleware, taskRouter);
// app.use('/tasks', taskRouter); // Development environment

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
