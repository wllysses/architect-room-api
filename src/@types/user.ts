import { z } from "zod";
import { userSchema } from "../schemas/schemas";

export type UserSchema = z.infer<typeof userSchema>;
