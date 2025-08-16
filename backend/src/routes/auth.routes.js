import express from 'express'
import { login, register } from '../controllers/auth.controllers.js'


let router = express.Router()


//register   ->     http://localhost:5001/api/v1/auth/register
router.post("/register", register)

//register   ->     http://localhost:5001/api/v1/auth/login
router.post("/login", login)

export default router