import type { BookService } from "../../services/BookService.js";
import type { Book } from "../../entities/Book.js";

interface CreateBookDeps {
  bookService: BookService;
}

interface CreateBookPayload {
  title: string;
  author: string;
  categoryId: string;
}

export async function CreateBook(
  { bookService }: CreateBookDeps,
  { title, author, categoryId }: CreateBookPayload
) {
  const existingBooks = await bookService.findByTitle(title);
  if (existingBooks.length > 0) return new Error("El libro ya existe");

  const newBook: Book = {
    id: crypto.randomUUID(),
    title,
    author,
    categoryId,
    available: true,
  };

  await bookService.save(newBook);

  return undefined; // <--- aseguramos que devuelva undefined al final
}
