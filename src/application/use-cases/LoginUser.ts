import {UserRepository} from "../../domain/repositories/UserRepository"
import {JwtService} from "../../infrastructure/services/JwtService"
export class LoginUser {

  constructor(
    private userRepo: UserRepository,
    private jwtService: JwtService
  ) {}

  async execute(email: string, password: string) {

    const user = await this.userRepo.findByEmail(email)

    if (!user) {
      throw new Error("User not found")
    }

    const token = this.jwtService.generateToken({
      id: user.id,
      role: user.role
    })

    return token

  }

}