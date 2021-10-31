require('dotenv/config');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const { authMiddleware ,userRouter, loginRouter, taskRouter } = require('./routers');

// ---------- USER ---------- //
app.use('/users', authMiddleware, userRouter);

// ---------- USER ---------- //
app.use('/login', loginRouter);

// ---------- USER ---------- //
app.use('/tasks', authMiddleware, taskRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
