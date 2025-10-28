import { describe, test, expect, beforeEach } from "vitest";

import { CreateLoan } from "./CreateLoan.js";
import { MokLoanService } from "../../services/moks/MokLoanService.js";
import { MokBookService } from "../../services/moks/MokBookService.js";

describe("CreateLoan", () => {
  let loanService: MokLoanService;
  let bookService: MokBookService;

  beforeEach(() => {
  
    bookService = new MokBookService();
    loanService = new MokLoanService(bookService); // pasamos bookService si lo necesita
  });

  test("Debe crear un préstamo si el libro está disponible", async () => {
   
    const book = {
      id: crypto.randomUUID(),
      title: "El Principito",
      author: "Antoine de Saint-Exupéry",
      categoryId: "cat-1",
      available: true,
    };

    await bookService.save(book);

    const result = await CreateLoan(
      { loanService, bookService },
      { userId: "user-1", bookId: book.id }
    );

    if (!(result instanceof Error)) {
      expect(result).toHaveProperty("id");
      expect(result.bookId).toBe(book.id);
    }
  });

  test("Debe devolver error si el libro ya está prestado", async () => {
    const book = {
      id: crypto.randomUUID(),
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      categoryId: "cat-1",
      available: false,
    };

    await bookService.save(book);

    const result = await CreateLoan(
      { loanService, bookService },
      { userId: "user-2", bookId: book.id }
    );

  
    expect(result).toBeInstanceOf(Error);
    if (result instanceof Error) {
      expect(result.message).toBe("El libro ya está prestado");
    }
  });
});
