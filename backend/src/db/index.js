import mongoose from "mongoose";

export default async function dbConnect() {
    try {
        await mongoose.connect("mongodb://127.0.0.1/authDB")
        console.log("db connected");
    }
    catch (err) {
        console.error("mongoose error", err.message);
    }
}