import { getBooks } from "@/app/api/books/route";
import { BooksList } from "./books-list";

export const metadata = {
  title: "Explorar | Book Wise",
  description: "Encontre os melhores livros",
};

export default async function Books() {
  const books = await getBooks();

  return <BooksList data={books} />;
}
