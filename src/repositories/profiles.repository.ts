import { ProfileProps, UpdateProfileProps } from "../@types/profile";
import { prismaClient } from "../database/prisma";

export class ProfilesRepository {
  public async findById(id: string) {
    const profile = await prismaClient.profile.findUnique({
      where: {
        id,
      },
    });

    return profile;
  }

  public async findByCAU(cau: string) {
    const profile = await prismaClient.profile.findUnique({
      where: {
        cau,
      },
    });

    return profile;
  }

  public async create({
    user_id,
    cau,
    phone,
    date_of_birth,
    city,
    state,
  }: ProfileProps) {
    const profile = await prismaClient.profile.create({
      data: {
        user_id,
        cau,
        phone,
        date_of_birth,
        city,
        state,
      },
    });

    return profile;
  }

  public async update({
    cau,
    phone,
    date_of_birth,
    city,
    state,
    id,
  }: UpdateProfileProps) {
    const profile = await prismaClient.profile.update({
      where: {
        id,
      },
      data: {
        cau,
        phone,
        date_of_birth,
        city,
        state,
      },
    });

    return profile;
  }
}
