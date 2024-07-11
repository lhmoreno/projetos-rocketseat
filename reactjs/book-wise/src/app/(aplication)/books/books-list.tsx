"use client";

import { BookSidePanel } from "@/components/book-side-panel";
import RateStars from "@/components/rate-stars";
import { Book } from "@prisma/client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { categories } from "../../../../prisma/constants/categories";

function stylesLinkActive(active?: boolean) {
  if (active) {
    return "px-4 py-1 bg-purple-200 rounded-full flex items-center justify-center";
  } else {
    return "px-4 py-1 text-purple-100 border border-purple-100 rounded-full flex items-center justify-center";
  }
}

export function BooksList({ data: books }: { data: Book[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const params = searchParams.getAll("category");

  const filteredBooks = books.filter((book) => {
    if (!book.categories) return true;

    if (params.length === 0) return true;

    const categories = book.categories as string[];

    return categories.some((c) => params.includes(c));
  });

  function handleAddCategory(category: string) {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.append("category", category);

    const url = "/books?" + newParams.toString();

    router.push(url);
  }

  function handleRemoveCategory(category: string) {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.delete("category", category);

    const url = "/books?" + newParams.toString();

    router.push(url);
  }

  return (
    <div className="space-y-12">
      <nav className="flex gap-3 flex-wrap">
        <button
          className={stylesLinkActive(!params.length)}
          onClick={() => router.push("/books")}
        >
          Tudo
        </button>
        {categories.map((category) => {
          const wasActive = params.includes(category);

          return (
            <button
              key={category}
              className={stylesLinkActive(wasActive)}
              onClick={() =>
                !wasActive
                  ? handleAddCategory(category)
                  : handleRemoveCategory(category)
              }
            >
              {category}
            </button>
          );
        })}
      </nav>

      <div className="grid grid-cols-3 gap-4">
        {filteredBooks.map((book) => {
          return <BookWithPanel key={book.id} data={book} />;
        })}
      </div>
    </div>
  );
}

function BookWithPanel({ data }: { data: Book & { rate: number } }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="px-5 py-4 bg-gray-700 rounded-lg flex gap-5">
        <button
          className="transition-opacity hover:opacity-80"
          onClick={() => setOpen(true)}
        >
          <Image src={data.coverUrl} alt="" width={107} height={150} />
        </button>
        <div className="flex-1 flex flex-col py-1">
          <button
            className="text-left hover:underline"
            onClick={() => setOpen(true)}
          >
            <strong className="line-clamp-2">{data.name}</strong>
          </button>
          <p className="text-sm text-gray-400">{data.author}</p>

          <div className="mt-auto">
            <RateStars rate={data.rate} />
            <p className="mt-1.5 text-sm text-gray-400">
              {data.rate} avaliações
            </p>
          </div>
        </div>
      </div>

      <BookSidePanel open={open} onOpenChange={setOpen} book={data} />
    </>
  );
}
