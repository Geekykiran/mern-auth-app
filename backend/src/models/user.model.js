import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const authSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "username field is mandatory"],
            trim: true,
            minLength: [3, "minimum 3 characters are required for username"]
        },
        email: {
            type: String,
            required: [true, "email field is mandatory"],
            unique: true,
            validate: {
                validator: function (value) {
                    return value.toLowerCase().match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
                },
                message: "Enter proper Email"
            }
        },
        password: {
            type: String,
            required: [true, "password field is mandetory"],
            minLength: [6, "password should contain atleast 6 characters"]
        },
        confirmPassword: {
            type: String,
            required: [true, "password field is mandetory"],
            minLength: [6, "password should contain atleast 6 characters"],
            validate: {
                validator: function (value) {
                    return value === this.password
                },
                message: "both password and confirm password doesn't match!"
            }
        },
        role: {
            type: String,
            default: "user"
        },
    },
    {
        timestamps: true // createdAt and updatedAt
    }
)

//middleware are functions and they are also called
//  pre hooks--they run before mongoose query--they are on schema level

authSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        // hash the password
        this.password = await bcrypt.hash(this.password, 10)
        this.confirmPassword = undefined
        next()
    }else{
        throw new Error("error hashing password")
    }
})

let User = mongoose.model("User", authSchema)

export default User