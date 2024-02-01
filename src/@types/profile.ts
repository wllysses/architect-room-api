import { States } from "@prisma/client";

export type ProfileProps = {
  user_id: string;
  cau: string;
  phone: string;
  date_of_birth: string;
  city: string;
  state: States;
};

export type UpdateProfileProps = {
  id: string;
  cau: string;
  phone: string;
  date_of_birth: string;
  city: string;
  state: States;
};
