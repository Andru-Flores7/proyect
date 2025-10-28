import { describe, test, expect, beforeEach } from "vitest";


import { FindLoan } from "./FindLoan.js";
import { MokLoanService } from "../../services/moks/MokLoanService.js";

describe("FindLoan", () => {
  let loanService: MokLoanService;

  beforeEach(() => {
    loanService = new MokLoanService();
  });

  test("Debe encontrar un préstamo existente", async () => {
    // Creamos un préstamo simulado
    const loan = {
      id: crypto.randomUUID(),
      userId: "user-1",
      bookId: "book-1",
      loanDate: new Date(),
      returnDate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Guardamos en el mock (aunque save devuelva void)
    await loanService.save(loan);

    // Forzamos que findById devuelva nuestro préstamo
    (loanService.findById as any) = async (id: string) => loan;

    // Ahora buscamos usando el mismo ID
    const result = await FindLoan({ loanService }, { loanId: loan.id });

    // ✔ Comprobamos que el resultado tiene el id esperado
    expect(result).toHaveProperty("id");
    expect(result).toBe(loan.id);
  });

  test("Debe devolver error si el préstamo no existe", async () => {
    // Forzamos findById a devolver undefined
    (loanService.findById as any) = async () => undefined;

    const result = await FindLoan({ loanService }, { loanId: "fake-id" });

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Préstamo no encontrado");
  });
});
