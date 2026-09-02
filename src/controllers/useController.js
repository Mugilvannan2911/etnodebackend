const prisma = require('../config/prisma');

const getUsers = async (req, res) => {
    try {
        const results = await prisma.expense.findMany();
        res.json({
            status: 'success',
            message: 'Expenses fetched successfully',
            data: results
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Error fetching expenses from the database',
            error: err.message
        });
    }
};

const createUser = async (req, res) => {
    try {
        const { user_id, title, amount, category, expense_date } = req.body;

        const newExpense = await prisma.expense.create({
            data: {
                user_id,
                title,
                amount: parseFloat(amount),
                category,
                expense_date: expense_date ? new Date(expense_date) : undefined
            }
        });

        res.status(201).json({
            status: 'success',
            message: 'Expense created successfully',
            data: newExpense
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Error creating expense',
            error: err.message
        });
    }
};

module.exports = { getUsers, createUser };
