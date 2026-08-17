const express = require('express');

const userRoutes = require('./routes/userRoute');

const authRoutes = require('./routes/authRoute');

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Express server is running");
});

app.get("/api/debug-db", (req, res) => {
  res.json({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
  });
});

app.use('/api/expense', userRoutes);

app.use('/api/users', authRoutes);

module.exports = app;

