import type { BookService } from "../../services/BookService.js";
import type { Book } from "../../entities/Book.js";

interface BorrowBookDeps {
  bookService: BookService;
}

interface BorrowBookPayload {
  bookId: string;
}

export async function BorrowBook(
  { bookService }: BorrowBookDeps,
  { bookId }: BorrowBookPayload
) {
  const book = await bookService.findById(bookId);
  if (!book) return new Error("Libro no encontrado");
  if (!book.available) return new Error("Libro no disponible");

  book.available = false;
  await bookService.editOne(book);

  return book;
}
