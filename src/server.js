require('dotenv/config');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const { userRouter, loginRouter } = require('./routers');

// ---------- USER ---------- //
app.use('/users', userRouter);

// ---------- USER ---------- //
app.use('/login', loginRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
