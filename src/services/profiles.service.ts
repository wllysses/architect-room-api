import { ProfileProps, UpdateProfileProps } from "../@types/profile";
import { ProfilesRepository } from "../repositories/profiles.repository";

const profilesRepository = new ProfilesRepository();

export class ProfilesService {
  public async create({
    user_id,
    cau,
    phone,
    date_of_birth,
    city,
    state,
  }: ProfileProps) {
    const profileExists = await profilesRepository.findByCAU(cau);

    if (profileExists) {
      throw new Error("Perfil com CAU já existente.");
    }

    const profile = await profilesRepository.create({
      user_id,
      cau,
      phone,
      date_of_birth,
      city,
      state,
    });
    return {
      message: "Perfil criado com sucesso!",
      profile,
    };
  }

  public async update({
    id,
    cau,
    phone,
    date_of_birth,
    city,
    state,
  }: UpdateProfileProps) {
    const profileExists = await profilesRepository.findById(id);

    if (!profileExists) {
      throw new Error("Nenhum perfil encontrado");
    }

    const profile = await profilesRepository.update({
      id,
      cau,
      phone,
      date_of_birth,
      city,
      state,
    });
    return {
      message: "Perfil atualizado com sucesso!",
      profile,
    };
  }
}
