const bcrypt = require('bcrypt');
const prisma = require('../config/prisma');
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        if (!user) {
            return res.status(401).json({
                status: "error",
                message: "Invalid username or password"
            });
        }

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

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "7d"
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({
            status: "success",
            message: "User logged in successfully",
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error logging in user",
            error: error.message
        });
    }
};

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        return res.status(201).json({
            status: "success",
            message: "User Registered Successfully"
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error registering user",
            error: error.message
        });
    }
};

module.exports = { loginUser, registerUser }