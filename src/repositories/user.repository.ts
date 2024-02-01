import { UserSchema } from "../@types/user";
import { prismaClient } from "../database/prisma";

export class UsersRepository {
  public async create({ name, email, password }: UserSchema) {
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  }

  public async findOne(email: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
