import type { Loan } from "../../entities/Loan.js";
import type { BookService } from "../../services/BookService.js";
import type { LoanService } from "../../services/LoanService.js";


interface CreateLoanDeps {
  loanService: LoanService;
  bookService: BookService;
}

interface CreateLoanPayload {
  userId: string;
  bookId: string;
}

export async function CreateLoan(
  { loanService, bookService }: CreateLoanDeps,
  { userId, bookId }: CreateLoanPayload
) {
  
  const book = await bookService.findById(bookId);
  if (!book) return new Error("El libro no existe");
  if (!book.available) return new Error("El libro ya está prestado");

  // Crear el préstamo
  const newLoan: Loan = {
    id: crypto.randomUUID(),
    userId,
    bookId,
    loanDate: new Date(),
    returnDate: null,
  
  };

  await loanService.save(newLoan);
  book.available = false;
  await bookService.update(book);

  return newLoan;
}
