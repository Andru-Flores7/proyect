// src/domain/services/UserService.ts
import type { IUser, UserRole } from "../entities/User.js";
import type { Service } from "../utils/types/Service.js";


export interface UserService extends Service<IUser> {

  findByEmail(email: string): Promise<IUser | null>;
  promoteToAdmin(userId: string): Promise<IUser>;
  demoteToUser(userId: string): Promise<IUser>;
  activateUser(userId: string): Promise<IUser>;
  deactivateUser(userId: string): Promise<IUser>;
}

