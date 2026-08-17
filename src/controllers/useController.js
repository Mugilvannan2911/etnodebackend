const db = require('../config/db')

const getUsers = (req, res) => {
    db.query('SELECT * FROM expenses', (err, results) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Error fetching users from the database',
                error: err.message
            });
        }

        res.json({
            status: 'success',
            message: 'Users fetched successfully',
            data: results
        });
    })
}

const createUser = (req, res) => {
    const { user_id, title, amount, category, expense_date, created_at } = req.body;

    db.query('INSERT INTO expenses (user_id, title, amount, category, expense_date, created_at) VALUES (?, ?, ?, ?, ?, ?)', [user_id, title, amount, category, expense_date, created_at], (err, results) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Error creating user',
                error: err.message
            });
        }

        res.json({
            status: 'success',
            message: 'User created successfully',
            data: results
        });
    });
}

module.exports = { getUsers, createUser }