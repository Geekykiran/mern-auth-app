import express from 'express'
import dbConnect from './db/index.js'
import authRoutes from './routes/auth.routes.js'


dbConnect()
let app = express()

// middleware
app.use(express.json())

// routes
app.use("/api/v1/auth", authRoutes)
app.get("/home", (req, res, next) => {
    res.send("home pageeee")
})

export default app