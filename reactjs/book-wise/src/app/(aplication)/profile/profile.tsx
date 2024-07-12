"use client";

import { BookSidePanel } from "@/components/book-side-panel";
import RateStars from "@/components/rate-stars";
import Avatar from "@/components/ui/avatar";
import { Book as PrismaBook, Rating, User } from "@prisma/client";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import { useState } from "react";

interface ProfileProps {
  data: User;
  ratings: Array<
    Rating & {
      book: PrismaBook;
    }
  >;
}

export default function Profile({ data, ratings }: ProfileProps) {
  const [search, setSearch] = useState("");

  const filteredRatings = ratings.filter(
    (rating) =>
      rating.book.name
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()) ||
      rating.book.author
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase())
  );

  return (
    <main className="flex justify-between gap-14">
      <div className="flex-1">
        <div className="mt-10 relative w-full">
          <input
            value={search}
            onChange={(ev) => setSearch(ev.target.value)}
            type="text"
            placeholder="Buscar livro avaliado"
            className="w-full bg-transparent border border-gray-500 rounded pl-5 pr-20 py-3 placeholder:text-gray-400"
          />
          <i className="ph ph-magnifying-glass text-gray-500 text-xl absolute top-0 bottom-0 right-8 flex items-center" />
        </div>

        <div className="w-full mt-8 flex flex-col gap-6 max-w-[39rem]">
          {filteredRatings.map((rating) => (
            <Book key={rating.id} rating={rating} />
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="sticky top-10 flex flex-col items-center">
          <Avatar
            src={data.image ?? ""}
            alt={`Foto de perfil do(a) ${data.name}`}
            size="xl"
          />
          <div className="mt-5 text-center">
            <strong className="text-xl">{data.name}</strong>
            <p className="text-sm text-gray-400">
              membro desde {format(data.createdAt, "yyyy")}
            </p>
          </div>
          <hr className="mt-10 mb-8 w-8 h-1 rounded-full bg-gradient-horizontal" />
          <div className="py-5 px-14 flex flex-col gap-10">
            <div className="flex gap-5 items-center">
              <i className="ph ph-book-open text-green-100 text-4xl" />
              <div>
                <strong className="text-gray-200">
                  {data.booksPageReadAmount}
                </strong>
                <p className="text-sm text-gray-300">Páginas lidas</p>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <i className="ph ph-books text-green-100 text-4xl" />
              <div>
                <strong className="text-gray-200">
                  {data.ratingedBooksAmount}
                </strong>
                <p className="text-sm text-gray-300">Livros avaliados</p>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <i className="ph ph-user-list text-green-100 text-4xl" />
              <div>
                <strong className="text-gray-200">
                  {data.authorsReadAmount}
                </strong>
                <p className="text-sm text-gray-300">Autores lidos</p>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <i className="ph ph-bookmark-simple text-green-100 text-4xl" />
              <div>
                <strong className="text-gray-200">
                  {data.mostReadCategory}
                </strong>
                <p className="text-sm text-gray-300">Categoria mais lida</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Book({
  rating,
}: {
  rating: Rating & {
    book: PrismaBook;
  };
}) {
  const [open, setOpen] = useState(false);

  const distance = formatDistanceToNow(rating.createdAt, {
    locale: ptBR,
    addSuffix: true,
  });

  return (
    <div className="flex flex-col gap-2">
      <span className="ml-2 text-sm text-gray-300">{distance}</span>

      <div className="px-5 py-4 bg-gray-700 rounded-lg">
        <div className="flex gap-5">
          <button
            className="transition-opacity hover:opacity-80"
            onClick={() => setOpen(true)}
          >
            <Image src={rating.book.coverUrl} alt="" width={107} height={150} />
          </button>
          <div className="flex-1 flex flex-col py-1">
            <button
              className="text-left hover:underline"
              onClick={() => setOpen(true)}
            >
              <strong className="line-clamp-2">{rating.book.name}</strong>
            </button>
            <p className="text-sm text-gray-400">{rating.book.author}</p>

            <div className="mt-auto">
              <RateStars rate={rating.book.rate} />
              <p className="mt-1.5 text-sm text-gray-400">
                {rating.book.ratingsAmount} avaliações
              </p>
            </div>
          </div>
        </div>
        <p className="mt-6 text-gray-300">{rating.book.summary}</p>
      </div>

      <BookSidePanel open={open} onOpenChange={setOpen} book={rating.book} />
    </div>
  );
}
