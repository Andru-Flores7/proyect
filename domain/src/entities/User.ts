import type { Entity } from "../utils/types/entity.js";
import { isValidEmail, isValidPassword } from "../utils/validator.js";

export const UserRole = {
  ADMIN: "admin",
  USER: "user",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface IUser extends Entity {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
}

export class User implements IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    role: UserRole = UserRole.USER,
    isActive: boolean = true
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.isActive = isActive;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    this.validate();
  }

  private validate(): void {
    if (!this.name.trim()) {
      throw new Error("El usuario debe tener nombre");
    }

    if (isValidEmail(this.email)) {
      throw new Error("El usuario debe tener un email válido");
    }

    if (!isValidPassword(this.password)) {
      throw new Error("La contraseña debe tener almenos 6 caracteres");
    }
      if (!this.isValidRole(this.role)) {
        throw new Error("Rol de usuario inválido");
      
    }
  }
  private isValidRole(role: string): role is UserRole {
    return Object.values(UserRole).includes(role as UserRole);
  }


// MÉTODOS DE NEGOCIO 



  promoteToAdmin(): void {
    this.role = UserRole.ADMIN;
    this.updateTimestamp();
  }

  /**
    DEGRADAR A USER - Cambia el rol a usuario común
   */
  demoteToUser(): void {
    this.role = UserRole.USER;
    this.updateTimestamp();
  }

  /**
   VERIFICAR SI ES ADMIN 
   */
  isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  /* VERIFICAR SI ES USER 
   */
  isRegularUser(): boolean {
    return this.role === UserRole.USER;
  }

  /*ACTIVAR USUARIO 
   */
  activate(): void {
    this.isActive = true;
    this.updateTimestamp();
  }

  /* DESACTIVAR USUARIO -
   */
  deactivate(): void {
    this.isActive = false;
    this.updateTimestamp();
  }
  // Actualizar la fecha de actualización
  private updateTimestamp(): void {
    this.updatedAt = new Date();
  }



}
