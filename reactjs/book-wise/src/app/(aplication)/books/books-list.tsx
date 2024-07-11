"use client";

import { BookSidePanel } from "@/components/book-side-panel";
import RateStars from "@/components/rate-stars";
import { Book, Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function stylesLinkActive(active?: boolean) {
  if (active) {
    return "px-4 py-1 bg-purple-200 rounded-full flex items-center justify-center";
  } else {
    return "px-4 py-1 text-purple-100 border border-purple-100 rounded-full flex items-center justify-center";
  }
}

export function BooksList() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const params = searchParams.getAll("category");

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("/api/categories");

      const data = await response.json();

      return data;
    },
  });

  const { data: books, isLoading } = useQuery<Array<Book & { rate: number }>>({
    queryKey: ["books", params],
    queryFn: async () => {
      const search_params = new URLSearchParams(searchParams.toString());

      const response = await fetch(
        `/api/books${params.length > 0 ? "?" + search_params.toString() : ""}`
      );

      const data = await response.json();

      return data;
    },
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
        {categories?.map((category) => {
          const wasActive = params.includes(category.name);

          return (
            <button
              key={category.id}
              className={stylesLinkActive(wasActive)}
              onClick={() =>
                !wasActive
                  ? handleAddCategory(category.name)
                  : handleRemoveCategory(category.name)
              }
            >
              {category.name}
            </button>
          );
        })}
      </nav>

      {!isLoading ? (
        <div className="grid grid-cols-3 gap-4">
          {books?.map((book) => {
            return <BookWithPanel key={book.id} data={book} />;
          })}
        </div>
      ) : (
        <FallbackBooks />
      )}
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
          <Image src={data.cover_url} alt="" width={107} height={150} />
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

function FallbackBooks() {
  const numbers = Array.from(new Array(15), (_, i) => String(i + 1));

  return (
    <div className="relative">
      <div className="absolute inset-0 overflow-hidden h-loading-books">
        <div className="grid grid-cols-3 gap-4">
          {numbers.map((id) => {
            return (
              <div key={id} className="px-5 py-4 bg-gray-700 rounded-lg">
                <div className="animate-pulse flex gap-5">
                  <div className="h-40 w-32 bg-gray-300/10 rounded" />
                  <div className="py-3">
                    <div className="h-4 w-32 bg-gray-300/10 rounded" />
                    <div className="mt-2 h-3 w-24 bg-gray-300/10 rounded" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
