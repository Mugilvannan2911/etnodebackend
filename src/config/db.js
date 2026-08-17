const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "mydatabase",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }

    console.log("Connected to the database.");
});

module.exports = connection;