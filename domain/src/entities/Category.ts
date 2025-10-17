
import type { Entity } from "../utils/types/entity.js";

export interface ICategory extends Entity {
  name: string;
  description: string;
}

export class Category implements ICategory {
  id: string;
  name: string;
  description: string;
   createdAt: Date;
  updatedAt?: Date;


 constructor(
    id: string,
    name: string,
    description: string,
     createdAt?: Date,
  updatedAt?: Date
 
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt ?? new Date();
  this.updatedAt = updatedAt;

    this.validate();
  }

  private validate() :void {
    if (!this.id?.trim()) {
    throw new Error("La categoría debe tener un ID");
  }
    if (!this.name?.trim()) {
      throw new Error("La categoría debe tener un nombre");
    }
     if (!this.description?.trim()) {
    throw new Error("La categoría debe tener una descripción");
  }
  }

  rename(newName: string) :void {
    if (!newName?.trim()) throw new Error("El nombre no puede estar vacío");
    this.name = newName;
      this.updatedAt = new Date();

  }

}

