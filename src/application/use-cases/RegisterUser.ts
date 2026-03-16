import bcrypt from "bcrypt"
import { User } from "../../domain/entities/User"
import { UserRepository } from "../../domain/repositories/UserRepository"

export class RegisterUser {

  constructor(private userRepository: UserRepository) {}

  async execute(email: string, password: string, role: "admin" | "user"): Promise<User> {

    const existingUser = await this.userRepository.findByEmail(email)

    if (existingUser) {
      throw new Error("User already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User(
      0,
      email,
      hashedPassword,
      role
    )

    const createdUser = await this.userRepository.create(user)

    return createdUser
  }

}