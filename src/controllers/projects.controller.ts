import { Request, Response, NextFunction } from "express";
import { ProjectsService } from "../services/projects.service";
import { prismaClient } from "../database/prisma";

const projectsService = new ProjectsService();

export class ProjectsController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description } = req.body;
      const { filename } = req.file as Express.Multer.File;
      const { id } = req.user;

      const response = await projectsService.create({
        name,
        description,
        url: filename,
        user_id: id,
      });
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  public async download(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const project = await prismaClient.project.findFirst({
        where: {
          id,
        },
      });

      if (!project) {
        throw new Error("Nenhum projeto encontrado");
      }

      return res
        .status(200)
        .download(`./src/multer/uploads/${project.url}`, project.url, (err) => {
          if (err) {
            throw new Error(err.message);
          }
        });
    } catch (err) {
      next(err);
    }
  }
}
