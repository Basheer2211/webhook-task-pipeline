import jwt from "jsonwebtoken"

export class JwtService {

  generateToken(payload: any) {

    return jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    )

  }

  verify(token: string) {

    return jwt.verify(token, process.env.JWT_SECRET!)

  }

}