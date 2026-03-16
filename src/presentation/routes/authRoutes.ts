import express from "express"
import { AuthController } from "../controllers/AuthController"
import { RegisterUser } from "../../application/use-cases/RegisterUser"
import { LoginUser } from "../../application/use-cases/LoginUser"
import { PrismaUserRepository } from "../../infrastructure/database/PrismaUserRepository"
import { JwtService } from "../../infrastructure/services/JwtService"

const router = express.Router()

const userRepository = new PrismaUserRepository()
const jwtService = new JwtService()

const registerUser = new RegisterUser(userRepository)
const loginUser = new LoginUser(userRepository, jwtService)

const authController = new AuthController(loginUser, registerUser)

router.post("/auth/login", (req, res) => authController.login(req, res))
router.post("/auth/register", (req, res) => authController.register(req, res))

export default router