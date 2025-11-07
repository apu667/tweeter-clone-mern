const User = require('../models/userModels');
const bcrypt = require("bcryptjs")

module.exports.signUp = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(401).json({
                success: false,
                message: "All field are required"
            })
        }
        const exitingUser = await User.findOne({ email });
        if (exitingUser) {
            return res.status(401).json({
                success: false,
                message: "This email is already exiting"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashPassword
        })

        return res.status(201).json({
            success: true,
            message: "User is register successfully",
            user: {
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        console.log(error)
        return res.status(501).json({
            success: false,
            message: "Internal server error user create",
        })
    }
}

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "All field are required"
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not found"
            })
        }
        const comparePass = await bcrypt.compare(password, user.password);
        if (!comparePass) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            })
        }
        return res.status(401).json({
            success: true,
            message:"User login successfully"
        })
    } catch (error) {

    }
}