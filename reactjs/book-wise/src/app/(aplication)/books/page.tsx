import { BooksList } from "./books-list";

export const metadata = {
  title: "Explorar | Book Wise",
  description: "Encontre os melhores livros",
};

export default async function Books() {
  return <BooksList />;
}
