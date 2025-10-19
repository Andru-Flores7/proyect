import { Entity } from "../utils/types/entity.js";

export interface Book extends Entity {
  title: string;
  author: string;
  categoryId: string ;
  available: boolean;
}





//   private validate(): void {

//      if (!this.id?.trim()) {
//       throw new Error("Un libro debe tener un ID");
//     }

//     if (!this.title || !this.title.trim()) {
//       throw new Error("Un libro debe tener título");
//     }

//     if (!this.author || !this.author.trim()) {
//       throw new Error("Un libro debe tener autor");
//     }
 
//     if (!this.categoryId?.trim()) {
//       throw new Error("Un libro debe tener categoria");
//     }


  
  
//   }

//   // Un libro puede ser prestado
//   borrow(): void {
//     if (!this.available) {
//       throw new Error("No se puede prestar un libro que no está disponible");
//     }
//     this.available = false;
//     this.updatedAt = new Date();
//   }


//   // Un libro puede ser devuelto


//   returnBook(): void {
//     if (this.available) {
//       throw new Error("No se puede devolver un libro que ya está disponible");
//     }
//     this.available = true;
//     this.updatedAt = new Date();
//   }
// }
