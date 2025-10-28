// src/domain/services/BookService.ts
import type { Book } from "../entities/Book.js";
import type { Service } from "../utils/types/Service.js";

export interface BookService extends Service<Book> {
  findByAuthor: (author: string) => Promise<Book[]>;
  findByTitle: (title: string) => Promise<Book[]>;
  findAvailable: () => Promise<Book[]>;
  borrowBook: (id: string) => Promise<Book | undefined>;
  returnBook: (id: string) => Promise<Book | undefined>;
  save(book: Book): Promise<void>;
  update(book: Book): Promise<void>;
}