import { ProjectsRepository } from "../repositories/projects.repository";

const projectsRepository = new ProjectsRepository();

export class ProjectsService {
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
    const project = await projectsRepository.create({
      name,
      description,
      url,
      user_id,
    });

    return {
      message: "Projeto cadastrado com sucesso!",
      project,
    };
  }
}
