import type { Entity } from "../utils/types/entity.js";

export const UserRole = {
  ADMIN: "admin",
  USER: "user",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface User extends Entity {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
}
