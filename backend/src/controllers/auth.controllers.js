import User from "../models/User.model.js";
import bcrypt from "bcryptjs";


let register = async (req, res, next) => {
    let { username, email, password, confirmPassword } = req.body
    try {
        let existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(400).json({ message: "User with this email already exists" })
            return
        }

        let newUser = await User.create({
            username,
            email,
            password,
            confirmPassword
        })
        res.status(200).json({ username: newUser.username, email: newUser.email })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

let login = async (req, res, next) => {
    let { email, password } = req.body
    try {
        // check user is available or not
        let existingUser = await User.findOne({ email })
        if (!existingUser) {
            res.status(400).json({ message: "User with this email does not exist, do register" })
            return
        }

        // match password with hashed password in db
        let isMatch = bcrypt.compare(password, existingUser.password)

        if (!isMatch) {
            res.status(400).json({ message: "Invalid password" })
        }

        // return user if password is a match
        res.status(200).json({ username: existingUser.username, email: existingUser.email })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export { register, login }