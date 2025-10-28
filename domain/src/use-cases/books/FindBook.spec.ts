import { describe, test, expect } from "vitest";
import { FindBook } from "./FindBook.js";
import { MokBookService } from "../../services/moks/MokBookService.js";

describe("FindBook", () => {
  const bookService = new MokBookService(3); // Crea 3 libros de prueba

  test("Debe encontrar un libro por ID", async () => {
    const allBooks = await bookService.findAll();
    const book = allBooks[0];

    // 👇 verificamos que el libro exista antes de usarlo
    expect(book).toBeDefined();

    if (!book) return; // Si por alguna razón no existe, cortamos el test

    const found = await FindBook({ bookService }, { id: book.id });
    expect(found).toEqual(book);
  });

  test("Debe encontrar libros por título", async () => {
    const allBooks = await bookService.findAll();
    const book = allBooks[0];
    expect(book).toBeDefined();
    if (!book) return;

    const found = await FindBook({ bookService }, { title: book.title });

    if (Array.isArray(found) && found.length > 0) {
      expect(found[0]?.title).toBe(book.title);
    } else {
    
      expect(found && "title" in found ? found.title : "").toBe(book.title);
    }
  });
});
