// src/services/mocks/MockUserService.ts
import { UserRole, type User } from "../../entities/User.js";
import { UserMok } from "../../entities/moks/UserMok.js";
import type { UserService } from "../UserService.js";

export class MokUserService implements UserService {
  public users: User[] = [];

  constructor(initialUsers: User[] = []) {
  
    this.users = [...initialUsers];
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find(u => u.id === id);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async editOne(data: User): Promise<User> {
    const index = this.users.findIndex(u => u.id === data.id);
    if (index === -1) throw new Error("User not found");
    this.users[index] = data;
    return data;
  }

  async updateMany(data: User[]): Promise<User[] | undefined> {
    this.users = data;
    return this.users;
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter(u => u.id !== id);
  }


  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(u => u.email === email);
  }

  async findByName(name: string): Promise<User | undefined> {
    return this.users.find(u => u.name === name);
  }

  async findByRole(role: UserRole): Promise<User[]> {
    return this.users.filter(u => u.role === role);
  }
}
