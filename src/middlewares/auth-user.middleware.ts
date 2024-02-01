import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export class AuthUserMiddleware {
  public handler(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(404).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        status: "error",
        message: "Access token is required",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
      if (err) {
        return res.status(404).json({
          message: err.message,
        });
      }

      console.log(decoded);
      req.user = decoded;
      next();
    });
  }
}
