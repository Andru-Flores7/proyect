// src/use-cases/books/BorrowBook.spec.ts
import { describe, expect, test } from "vitest";
import { BorrowBook } from "./BorrowBook.js";
import { MokBookService } from "../../services/moks/MokBookService.js";
import type { Book } from "../../entities/Book.js";

describe("BorrowBook", () => {
  const bookService = new MokBookService(1); // un solo libro de prueba
  const book: Book = bookService.books[0]!;

  test("Debe prestar un libro disponible", async () => {
    const result = await BorrowBook({ bookService }, { bookId: book.id });

    // si devuelve un libro correctamente
    expect(result).not.toBeInstanceOf(Error);
    expect((result as Book).available).toBe(false);
  });

  test("Si el libro no existe, devuelve un error", async () => {
    const result = await BorrowBook({ bookService }, { bookId: "id-inexistente" });

    // verificamos que realmente sea un Error antes de leer su mensaje
    expect(result).toBeInstanceOf(Error);
    if (result instanceof Error) {
      expect(result.message).toBe("Libro no encontrado");
    }
  });

  test("Si el libro ya está prestado, devuelve un error", async () => {
    // Intentamos prestarlo otra vez
    const result = await BorrowBook({ bookService }, { bookId: book.id });

    expect(result).toBeInstanceOf(Error);
    if (result instanceof Error) {
      expect(result.message).toBe("Libro no disponible");
    }
  });
});
