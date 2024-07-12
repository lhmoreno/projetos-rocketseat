"use client";

import Image from "next/image";
import RatingHeader from "@/components/rating-header";
import {
  DefaultError,
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { RatingsPage } from "@/app/api/ratings/route";
import { BookSidePanel } from "@/components/book-side-panel";
import { Book, Rating as PrismaRating, User } from "@prisma/client";

export function Ratings({ data: list }: { data: RatingsPage }) {
  const {
    data: { pages },
    dataUpdatedAt,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    RatingsPage,
    DefaultError,
    InfiniteData<RatingsPage>,
    QueryKey,
    number
  >({
    initialPageParam: 1,
    initialData: { pageParams: [1], pages: [list] },
    enabled: (query) => query.state.data?.pageParams[0] !== 1,
    queryKey: ["ratings"],
    queryFn: async ({ pageParam }) => {
      const response = await fetch(`/api/ratings?page=${pageParam}`);

      const data = await response.json();

      return data;
    },
    getNextPageParam: ({ nextPage }) => nextPage && nextPage,
  });

  const isSearchingNextPage = useRef(false);

  useEffect(() => {
    const checkScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      // const scrollHeight = docHeight - winHeight;
      // const scrollPercentage = (scrollTop / scrollHeight) * 100;

      const restHeight = docHeight - scrollTop + winHeight;

      if (restHeight < 2800 && !isSearchingNextPage.current) {
        isSearchingNextPage.current = true;
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", checkScroll);

    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  useEffect(() => {
    isSearchingNextPage.current = false;
  }, [dataUpdatedAt]);

  return (
    <div>
      <ul className="mt-4 space-y-4 max-w-[38rem]">
        {pages.map((page, index) => (
          <div key={index} className="space-y-4">
            {page.ratings.map((rating) => (
              <Rating key={rating.id} data={rating} />
            ))}
          </div>
        ))}
      </ul>

      {isFetchingNextPage && (
        <div className="mt-8 mx-auto border-t-2 border-b-2 border-white/70 rounded-full w-4 h-4 animate-spin" />
      )}
    </div>
  );
}

function Rating({
  data: rating,
}: {
  data: PrismaRating & {
    book: Book;
    user: User;
  };
}) {
  const [open, setOpen] = useState(false);

  return (
    <li key={rating.id} className="h-[17.5rem] bg-gray-700 rounded-lg p-6">
      <RatingHeader
        user={rating.user}
        createdAt={rating.createdAt}
        rate={rating.rate}
      />
      <main className="mt-8 flex gap-5">
        <button
          className="transition-opacity hover:opacity-80"
          onClick={() => setOpen(true)}
        >
          <Image
            src={rating.book.coverUrl}
            alt=""
            className="rounded shadow"
            width={107}
            height={150}
          />
        </button>
        <div className="flex-1">
          <button
            className="text-left hover:underline"
            onClick={() => setOpen(true)}
          >
            <strong>{rating.book.name}</strong>
          </button>
          <p className="text-sm text-gray-400">{rating.book.author}</p>
          <p className="mt-5 text-gray-300 line-clamp-3">
            {rating.description}
          </p>
        </div>
      </main>

      <BookSidePanel open={open} onOpenChange={setOpen} book={rating.book} />
    </li>
  );
}
