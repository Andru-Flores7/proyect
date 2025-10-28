// src/domain/services/UserService.ts
import type { User, UserRole } from "../entities/User.js";
import type { Service } from "../utils/types/Service.js";

export interface UserService extends Service<User> {
  findByRole: (role: UserRole) => Promise<User[]>;

  findByEmail:(email: string)=> Promise<User | undefined>;
  findByName : (name: string)=> Promise<User | undefined>
}
