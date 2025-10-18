// src/domain/services/BookService.ts
import type { IBook } from "../entities/Book.js";
import type { Service } from "../utils/types/Service.js";

export interface BookService extends Service<IBook> {
  findByAuthor: (author: string) => Promise<IBook[]>;
  findByTitle: (title: string) => Promise<IBook[]>;
  findAvailable: () => Promise<IBook[]>;
  borrowBook: (id: string) => Promise<IBook>;
  returnBook: (id: string) => Promise<IBook>;
}