import { UserSchema } from "../@types/user";
import { UsersRepository } from "../repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const usersRepository = new UsersRepository();

export class UsersService {
  public async create({ name, email, password }: UserSchema) {
    const userExists = await usersRepository.findOne(email);

    if (userExists) {
      throw new Error("E-mail já cadastrado");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      message: "Usuário cadastrado com sucesso!",
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }

  public async auth({ email, password }: { email: string; password: string }) {
    const userExists = await usersRepository.findOne(email);

    if (!userExists) {
      throw new Error("E-mail ou senha incorretos.");
    }

    const isValidPassword = await bcrypt.compare(password, userExists.password);

    if (!isValidPassword) {
      throw new Error("E-mail ou senha incorretos.");
    }

    const token = jwt.sign(
      {
        id: userExists.id,
        name: userExists.name,
        email: userExists.email,
      },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "7d" }
    );

    return {
      user: {
        id: userExists.id,
        name: userExists.name,
        email: userExists.email,
      },
      token,
    };
  }
}
