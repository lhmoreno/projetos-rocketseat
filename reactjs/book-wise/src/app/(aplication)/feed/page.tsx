import Link from "next/link";
import Image from "next/image";
import { getRatings } from "@/app/api/ratings/route";
import { getPopularBooks } from "@/app/api/books/popular/route";
import RatingHeader from "@/components/rating-header";
import RateStars from "@/components/rate-stars";

export const metadata = {
  title: "Início | Book Wise",
  description: "Veja as avaliações de livros de outros usuários",
};

export default async function Home() {
  const [ratings, popularBooks] = await Promise.all([
    getRatings(),
    getPopularBooks(),
  ]);

  return (
    <main className="flex justify-between gap-6">
      <div>
        <p className="text-sm">Avaliações mais recentes</p>

        <ul className="mt-4 flex flex-col gap-4 max-w-[38rem]">
          {ratings.map((rating) => {
            return (
              <li
                key={rating.id}
                className="h-[17.5rem] bg-gray-700 rounded-lg p-6"
              >
                <RatingHeader
                  user={rating.user}
                  createdAt={rating.created_at}
                  rate={rating.rate}
                />
                <main className="mt-8 flex gap-5">
                  {/* <ButtonOpenSidePanel type="image" book={rating.book}> */}
                  <Image
                    src={rating.book.cover_url}
                    alt=""
                    className="rounded shadow"
                    width={107}
                    height={150}
                  />
                  {/* </ButtonOpenSidePanel> */}
                  <div className="flex-1">
                    {/* <ButtonOpenSidePanel type="text" book={rating.book}> */}
                    <strong>{rating.book.name}</strong>
                    {/* </ButtonOpenSidePanel> */}
                    <p className="text-sm text-gray-400">
                      {rating.book.author}
                    </p>
                    <p className="mt-5 text-gray-300 line-clamp-3">
                      {rating.description}
                    </p>
                  </div>
                </main>
              </li>
            );
          })}
        </ul>
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

        <ul className="mt-4 flex flex-col gap-3 min-w-[17rem] max-w-xs">
          {popularBooks.map((book) => {
            return (
              <li
                key={book.id}
                className="px-5 py-4 bg-gray-700 rounded-lg flex gap-5"
              >
                {/* <ButtonOpenSidePanel type="image" book={book}> */}
                <Image
                  src={book.cover_url}
                  alt="Capa do livro"
                  className="rounded"
                  width={70}
                  height={98}
                />
                {/* </ButtonOpenSidePanel> */}
                <div className="flex-1 flex flex-col py-0.5">
                  {/* <ButtonOpenSidePanel type="text" book={book}> */}
                  <strong className="line-clamp-2">{book.name}</strong>
                  {/* </ButtonOpenSidePanel> */}
                  <p className="text-sm text-gray-400">{book.author}</p>

                  <div className="mt-auto">
                    <RateStars rate={book.rate} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
