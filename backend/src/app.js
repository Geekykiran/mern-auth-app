import express from 'express'
import dbConnect from './db/index.js'
import authRoutes from './routes/auth.routes.js'
import cors from 'cors'


dbConnect()
let app = express()

app.use(cors({
  origin: "http://localhost:5173", // frontend origin
  credentials: true,               // allow cookies/headers (if needed)
}));

// middleware
app.use(express.json())

// routes
app.use("/api/v1/auth", authRoutes)
app.get("/home", (req, res, next) => {
    res.send("home pageeee")
})

export default app