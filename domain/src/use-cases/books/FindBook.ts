import type { BookService } from "../../services/BookService.js";
import type { Book } from "../../entities/Book.js";

interface FindBookDeps {
  bookService: BookService;
}

interface FindBookPayload {
  id?: string;
  title?: string;
  author?: string;
}
export async function FindBook(
  { bookService }: FindBookDeps,
  { id, title, author }: FindBookPayload
): Promise<Book[] | Book | undefined> {
  if (id) {
    return await bookService.findById(id);
  }
  if (title) {
    return await bookService.findByTitle(title);
  }
  if (author) {
    return await bookService.findByAuthor(author);
  }

  return undefined;
}
