// src/domain/services/mocks/MokBookService.ts
import type { BookService } from "../BookService.js";
import type { Book } from "../../entities/Book.js";
import { BookMok } from "../../entities/moks/BookMok.js";

export class MokBookService implements BookService {
  public books: Book[] = [];

  constructor(initialBooksCount = 10) {
    for (let i = 0; i < initialBooksCount; i++) {
      this.books.push(BookMok());
    }
  }

  async save(book: Book): Promise<void> {
    this.books.push(book);
  }
  async update(book: Book): Promise<void> {
    const index = this.books.findIndex(b => b.id === book.id);
    if (index === -1) throw new Error("Book not found");
    this.books[index] = book;
  }
  async findById(id: string): Promise<Book | undefined> {
    return this.books.find(b => b.id === id);
  }

  async findAll(): Promise<Book[]> {
    return this.books;
  }

 

  async editOne(book: Book): Promise<Book> {
    const index = this.books.findIndex(b => b.id === book.id);
    if (index === -1) throw new Error("Book not found");
    this.books[index] = book;
    return book;
  }

  async updateMany(books: Book[]): Promise<Book[]> {
    this.books = books;
    return this.books;
  }

  async delete(id: string): Promise<void> {
    this.books = this.books.filter(b => b.id !== id);
  }

  async findByAuthor(author: string): Promise<Book[]> {
    return this.books.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
  }

  async findByTitle(title: string): Promise<Book[]> {
    return this.books.filter(b => b.title === title);
  }

  async findAvailable(): Promise<Book[]> {
    return this.books.filter(b => b.available);
  }

  async borrowBook(id: string): Promise<Book | undefined> {
    const book = await this.findById(id);
    if (!book || !book.available) return undefined;
    book.available = false;
    return book;
  }

  async returnBook(id: string): Promise<Book | undefined> {
    const book = await this.findById(id);
    if (!book) throw new Error("Libro no encontrado");
    book.available = true;
    return book;
  }
}
