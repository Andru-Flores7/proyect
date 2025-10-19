
import type { Entity } from "../utils/types/entity.js";
import { isValidEmail, isValidPassword } from "../utils/validator.js";

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
}




/*
  private validate(): void {
    if (!this.name.trim()) {
      throw new Error("El usuario debe tener nombre");
    }

    if (!isValidEmail(this.email)) {
      throw new Error("El usuario debe tener un email válido");
    }

    if (!isValidPassword(this.password)) {
      throw new Error("La contraseña debe tener al menos 6 caracteres");
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
   
  demoteToUser(): void {
    this.role = UserRole.USER;
    this.updateTimestamp();
  }

  /**
   VERIFICAR SI ES ADMIN 
   
  isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  /* VERIFICAR SI ES USER 
   
  isRegularUser(): boolean {
    return this.role === UserRole.USER;
  }

  

 
 



*/
