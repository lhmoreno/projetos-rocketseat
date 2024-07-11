"use client";

import { BookSidePanel } from "@/components/book-side-panel";
import RateStars from "@/components/rate-stars";
import { Book } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

export function PopularBooks({ data }: { data: Book[] }) {
  return (
    <div>
      <ul className="mt-4 flex flex-col gap-3 min-w-[17rem] max-w-xs">
        {data.map((book) => {
          const [open, setOpen] = useState(false);

          return (
            <li
              key={book.id}
              className="px-5 py-4 bg-gray-700 rounded-lg flex gap-5"
            >
              <button
                className="transition-opacity hover:opacity-80"
                onClick={() => setOpen(true)}
              >
                <Image
                  src={book.coverUrl}
                  alt="Capa do livro"
                  className="rounded"
                  width={70}
                  height={98}
                />
              </button>
              <div className="flex-1 flex flex-col py-0.5">
                <button
                  className="text-left hover:underline"
                  onClick={() => setOpen(true)}
                >
                  <strong className="line-clamp-2">{book.name}</strong>
                </button>
                <p className="text-sm text-gray-400">{book.author}</p>

                <div className="mt-auto">
                  <RateStars rate={book.rate} />
                </div>
              </div>

              <BookSidePanel open={open} onOpenChange={setOpen} book={book} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
