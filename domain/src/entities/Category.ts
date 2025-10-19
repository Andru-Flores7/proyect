import type { Entity } from "../utils/types/entity.js";

export interface Category extends Entity {
  name: string;
  description: string;
  
}

//   private validate() :void {
//     if (!this.id?.trim()) {
//     throw new Error("La categoría debe tener un ID");
//   }
//     if (!this.name?.trim()) {
//       throw new Error("La categoría debe tener un nombre");
//     }
//      if (!this.description?.trim()) {
//     throw new Error("La categoría debe tener una descripción");
//   }
//   }

//   rename(newName: string) :void {
//     if (!newName?.trim()) throw new Error("El nombre no puede estar vacío");
//     this.name = newName;
//       this.updatedAt = new Date();

//   }

// }
