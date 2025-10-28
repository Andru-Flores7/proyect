// src/use-cases/books/CreateBook.spec.ts
import { describe, expect, test, beforeEach } from "vitest";
import type { BookService } from "../../services/BookService.js";
import { BookMok } from "../../entities/moks/BookMok.js";
import { MokBookService } from "../../services/moks/MokBookService.js";
import { CreateBook } from "./CreateBook.js";

describe("CreateBook", () => {
  let bookService: MokBookService & { books: ReturnType<typeof BookMok>[] };

  beforeEach(() => {
    bookService = new MokBookService(0); // empezamos sin libros
  });

  test("Debe crear un libro nuevo", async () => {
    const result = await CreateBook(
      { bookService },
      { title: "El Principito", author: "Saint-Exupéry", categoryId: "cat1" }
    );

    // CreateBook devuelve Error solo si ya existe, sino undefined
    expect(result).toBeUndefined();

    // Verificamos que se haya agregado el libro
    expect(bookService.books.length).toBeGreaterThan(0); // <-- aseguramos que haya al menos un libro
    const createdBook = bookService.books[0]; // ahora TypeScript sabe que no es undefined
    expect(createdBook).toMatchObject({
      title: "El Principito",
      author: "Saint-Exupéry",
      categoryId: "cat1",
      available: true,
    });
    expect(createdBook!.id).toEqual(expect.any(String));
  });

  test("Si el libro ya existe, debe devolver un error", async () => {
    // Guardamos un libro previo
    await bookService.save({
      id: crypto.randomUUID(),
      title: "El Principito",
      author: "Saint-Exupéry",
      categoryId: "cat1",
      available: true,
    });

    const result = await CreateBook(
      { bookService },
      { title: "El Principito", author: "Saint-Exupéry", categoryId: "cat1" }
    );

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("El libro ya existe");
  });
});
