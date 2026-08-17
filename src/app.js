const express = require('express');

const userRoutes = require('./routes/userRoute');

const authRoutes = require('./routes/authRoute');

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Express server is running");
});

app.use('/api/expense', userRoutes);

app.use('/api/users', authRoutes);

module.exports = app;

