import { States } from "@prisma/client";
import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z
    .string()
    .min(1, { message: "E-mail é obrigatório" })
    .email({ message: "Formato de e-mail inválido" }),
  password: z.string().min(5, { message: "Mínimo 5 caracteres" }),
});

export const authUserSchema = z.object({
  email: z
    .string()
    .min(1, { message: "E-mail é obrigatório" })
    .email({ message: "Formato de e-mail inválido" }),
  password: z.string().min(5, { message: "Mínimo 5 caracteres" }),
});

export const profilesSchema = z.object({
  cau: z.string().min(10, { message: "CAU é obrigatório" }),
  phone: z.string().min(1, { message: "Telefone é obrigatório" }),
  date_of_birth: z
    .string()
    .min(1, { message: "Data de aniverśario é obrigatório" })
    .transform((date) => new Date(date).toISOString()),
  city: z.string().min(1, { message: "Cidade é obrigatória" }),
  state: z
    .string()
    .min(1, { message: "Estado é obrigatório" })
    .transform((state) => state as States),
});
