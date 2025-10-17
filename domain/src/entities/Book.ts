import { Entity } from "../utils/types/entity.js";

export interface IBook extends Entity {
  title: string;
  author: string;
  categoryId: string ;
  available: boolean;
}

export class Book implements IBook {
  id: string;
  title: string;
  author: string;
  categoryId: string;
  available: boolean;
  createdAt: Date;
  updatedAt?: Date;

  constructor(
    id: string,
    title: string,
    author: string,
    categoryId: string,
    available: boolean = true,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.categoryId = categoryId;
    this.available = available;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt;

    this.validate();
  }



  private validate(): void {

     if (!this.id?.trim()) {
      throw new Error("Un libro debe tener un ID");
    }

    if (!this.title || !this.title.trim()) {
      throw new Error("Un libro debe tener título");
    }

    if (!this.author || !this.author.trim()) {
      throw new Error("Un libro debe tener autor");
    }
 
    if (!this.categoryId?.trim()) {
      throw new Error("Un libro debe tener categoria");
    }


  
  
  }

  // Un libro puede ser prestado
  borrow(): void {
    if (!this.available) {
      throw new Error("No se puede prestar un libro que no está disponible");
    }
    this.available = false;
    this.updatedAt = new Date();
  }


  // Un libro puede ser devuelto


  returnBook(): void {
    if (this.available) {
      throw new Error("No se puede devolver un libro que ya está disponible");
    }
    this.available = true;
    this.updatedAt = new Date();
  }
}
