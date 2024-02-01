import { prismaClient } from "../database/prisma";

export class ProjectsRepository {
  public async create({
    name,
    description,
    url,
    user_id,
  }: {
    name: string;
    description: string;
    url?: string;
    user_id: string;
  }) {
    const project = await prismaClient.project.create({
      data: {
        name,
        description,
        url: url!,
        user_id,
      },
    });

    return project;
  }
}
