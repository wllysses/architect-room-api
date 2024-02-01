import { Request, Response, NextFunction } from "express";
import { UsersService } from "../services/users.service";
import { authUserSchema, userSchema } from "../schemas/schemas";

const usersService = new UsersService();

export class UsersController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = userSchema.parse(req.body);

      const response = await usersService.create({
        name,
        email,
        password,
      });
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  public async auth(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = authUserSchema.parse(req.body);

      const response = await usersService.auth({
        email,
        password,
      });
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}
