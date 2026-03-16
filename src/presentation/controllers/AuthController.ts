import { Request, Response } from "express"
import { LoginUser } from "../../application/use-cases/LoginUser"
import { RegisterUser } from "../../application/use-cases/RegisterUser"

export class AuthController {

  constructor(
    private loginUser: LoginUser,
    private registerUser: RegisterUser
  ) {}

  async login(req: Request, res: Response) {

    try {

      const { email, password } = req.body

      const token = await this.loginUser.execute(email, password)

      res.status(200).json({
        message: "Login successful",
        token
      })

    } catch (error: any) {

      res.status(400).json({
        message: error.message
      })

    }

  }

  async register(req: Request, res: Response) {

    try {

      const { email, password ,role} = req.body

      const user = await this.registerUser.execute(email, password,role)

      res.status(201).json({
        message: "User created",
        data: user
      })

    } catch (error: any) {

      res.status(400).json({
        message: error.message
      })

    }

  }

}