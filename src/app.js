const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoute");
const authRoutes = require("./routes/authRoute");

const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());


// CORS

app.use(cors());

// app.use(cors({
//     origin: [
//         "http://127.0.0.1:5501",
//         "http://localhost:5501"
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));

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

app.use("/api/expense", userRoutes);
app.use("/api/users", authRoutes);

module.exports = app;