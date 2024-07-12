import Link from "next/link";
import { getRatings } from "@/app/api/ratings/route";
import { getPopularBooks } from "@/app/api/books/popular/route";
import { Ratings } from "./ratings";
import { PopularBooks } from "./popular-books";

export const metadata = {
  title: "Início | Book Wise",
  description: "Veja as avaliações de livros de outros usuários",
};

export default async function Home() {
  const [ratings, popularBooks] = await Promise.all([
    getRatings({ page: 1 }),
    getPopularBooks(),
  ]);

  return (
    <main className="flex justify-between gap-6">
      <div>
        <p className="text-sm">Avaliações mais recentes</p>

        <Ratings data={ratings} />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm">Livros populares</p>
          <Link
            href="/books"
            className="px-2 py-1 text-sm text-purple-100 font-bold flex items-center gap-2"
          >
            Ver todos
            <i className="ph ph-caret-right w-4 h-4" />
          </Link>
        </div>

        <PopularBooks data={popularBooks} />
      </div>
    </main>
  );
}
