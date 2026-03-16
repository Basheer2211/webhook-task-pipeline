import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export function adminMiddleware(req: Request, res: Response, next: NextFunction) {

  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      message: "Unauthorized"
    })
  }

  const token = authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({
      message: "Token missing"
    })
  }

  try {

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)

    if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin only."
      })
    }

    ;(req as any).user = decoded

    next()

  } catch {

    return res.status(403).json({
      message: "Invalid token"
    })

  }

}