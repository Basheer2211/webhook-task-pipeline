import { prisma } from "./prisma"
import { User } from "../../domain/entities/User"
import { UserRepository } from "../../domain/repositories/UserRepository"

export class PrismaUserRepository implements UserRepository {

  async findByEmail(email: string): Promise<User | null> {

    const user = await prisma.user.findUnique({
      where: { email }
    })
    if (!user) return null
    return new User(user.id, user.email, user.password, user.role as "user" | "admin")
  }

  async create(user: User): Promise<User> {

    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        role: user.role  
      }
    })

    return new User(newUser.id, newUser.email, newUser.password, newUser.role as "user" | "admin")
  }

}