require('dotenv/config');

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const { userRouter } = require('./routers');

// ---------- USER ---------- //
app.use('/user', userRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
