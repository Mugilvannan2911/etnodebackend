const bcrypt = require('bcrypt');
const db = require('../config/db');

const loginUser = (req, res) => {
    const { username, password} = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Error logging in user',
                error: err.message
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid username or password'
            });
        }

        const user = results[0];

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                status: "error",
                message: "Invalid username or password"
            });
        }


        res.json({
            status: 'success',
            message: 'User logged in successfully',
        });
    })
}

const registerUser = (req, res) => {
    const { username, email, password } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {

        if (err) {
            return res.status(500).json({
                status: "error",
                message: "Error hashing password",
                error: err.message
            });
        }

        db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, results) => {
            
            if (err) {
                return res.status(400).json({
                    status: 'error',
                    message: 'error inserting data',
                    error: err.message
                })
            }

            res.json({
                status: 'success',
                message: 'User Registered Successfully'
            })
        })
    })
}

module.exports = { loginUser, registerUser }