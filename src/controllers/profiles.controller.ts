import { Request, Response, NextFunction } from "express";
import { profilesSchema } from "../schemas/schemas";
import { ProfilesService } from "../services/profiles.service";

const profilesService = new ProfilesService();

export class ProfilesController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { cau, phone, date_of_birth, city, state } = profilesSchema.parse(
        req.body
      );
      const { id } = req.user;

      const response = await profilesService.create({
        user_id: id,
        cau,
        phone,
        date_of_birth,
        city,
        state,
      });
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { cau, phone, date_of_birth, city, state } = profilesSchema.parse(
        req.body
      );
      const { id } = req.params;

      const response = await profilesService.update({
        cau,
        phone,
        date_of_birth,
        city,
        state,
        id,
      });
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}
