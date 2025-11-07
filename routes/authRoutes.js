const express = require('express');
const { signUp, signIn } = require('../controller/userController');
const { verifyToken } = require('../middleware/authMiddleware');

const authRouter = express.Router();
authRouter.post("/signUp", signUp);
authRouter.post("/signIn", signIn);
authRouter.get("/verify", verifyToken, (req, res) => {
    res.status(201).json({
        success: true,
        message: "verify token"
    })
});
module.exports = authRouter