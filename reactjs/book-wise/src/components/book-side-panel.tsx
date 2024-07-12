"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { useCallback, useEffect, useRef, useState } from "react";

import RateStars from "./rate-stars";
import { Book } from "@prisma/client";
import RatingHeader from "./rating-header";
import {
  DefaultError,
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { BookRatingsResponse } from "@/app/api/books/[bookId]/ratings/route";
import DialogLogin from "./dialog-login";
import { RatingForm } from "./rating-form";

type BookSidePanelProps = Dialog.DialogProps & {
  book: Book;
};

export function BookSidePanel({ book, ...props }: BookSidePanelProps) {
  const [showForm, setShowForm] = useState(false);
  const { data: session, status } = useSession();

  const [isMounted, setIsMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const setDialogRef = useCallback<(node: HTMLDivElement | null) => void>(
    (node) => {
      if (node !== null) {
        // @ts-ignore
        dialogRef.current = node;
        !isMounted && setIsMounted(true);
      }
    },
    []
  );

  const { data, dataUpdatedAt, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery<
      BookRatingsResponse,
      DefaultError,
      InfiniteData<BookRatingsResponse>,
      QueryKey,
      number
    >({
      initialPageParam: 1,
      enabled: () => isMounted,
      queryKey: ["bookRatings", book.id],
      queryFn: async ({ pageParam }) => {
        const response = await fetch(
          `/api/books/${book.id}/ratings?page=${pageParam}`
        );

        const data = await response.json();

        return data;
      },
      getNextPageParam: ({ nextPage }) => nextPage && nextPage,
    });

  const isSearchingNextPage = useRef(false);

  useEffect(() => {
    if (isMounted) {
      const checkScroll = () => {
        const scrollTop = dialogRef.current?.scrollTop ?? 0;
        const docHeight = dialogRef.current?.scrollHeight ?? 0;
        const winHeight = window.innerHeight;

        const restHeight = docHeight - scrollTop - winHeight;

        if (restHeight < 700 && !isSearchingNextPage.current) {
          isSearchingNextPage.current = true;
          fetchNextPage();
        }
      };

      dialogRef.current?.addEventListener("scroll", checkScroll);

      return () =>
        dialogRef.current?.removeEventListener("scroll", checkScroll);
    }
  }, [isMounted]);

  useEffect(() => {
    isSearchingNextPage.current = false;
  }, [dataUpdatedAt]);

  const pages = data?.pages;
  const user = session?.user;
  const categories = book.categories as string[];
  const isLoading = status === "loading" || !pages;
  const hasUserRating = pages?.[0].ratings?.[0].user.slug === user?.slug;

  return (
    <>
      <Dialog.Root {...props}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 fixed inset-0 animate-dialogOverlay" />

          <Dialog.Content
            ref={setDialogRef}
            className="w-full max-w-2xl bg-gray-800 fixed top-0 bottom-0 right-0 px-12 py-16 overflow-y-scroll"
          >
            <Dialog.Title className="hidden">{book.name}</Dialog.Title>
            <Dialog.Description className="hidden">
              {book.summary}
            </Dialog.Description>
            {book && (
              <div className="px-8 py-6 bg-gray-700 rounded-xl">
                <div className="flex gap-8">
                  <Image
                    src={book.coverUrl}
                    alt=""
                    className="rounded-xl"
                    width={167}
                    height={234}
                  />
                  <div className="flex-1 flex flex-col py-1">
                    <strong className="line-clamp-2 text-lg">
                      {book.name}
                    </strong>
                    <p className="mt-2 text-gray-400">{book.author}</p>

                    <div className="mt-auto">
                      <RateStars rate={book.rate} className="text-xl" />
                      <p className="mt-1.5 text-sm text-gray-400">
                        {book.ratingsAmount} avaliações
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-10 border-t border-gray-600 flex gap-14 py-6">
                  <div className="flex gap-4 items-center">
                    <i className="ph ph-bookmark-simple text-green-100 text-2xl" />
                    <div>
                      <p className="text-sm text-gray-300">Categoria</p>
                      <strong className="text-gray-200">
                        {categories.join(", ")}
                      </strong>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <i className="ph ph-book-open text-green-100 text-2xl" />
                    <div>
                      <p className="text-sm text-gray-300">Páginas</p>
                      <strong className="text-gray-200">
                        {book.totalPages}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Ratings */}
            <div className="mt-10">
              <div className="flex justify-between items-center">
                <p className="text-gray-200 text-sm">Avaliações</p>
                {!showForm && user && !hasUserRating && (
                  <button
                    className="px-2 py-1 text-purple-100 font-bold"
                    onClick={() => setShowForm(true)}
                  >
                    Avaliar
                  </button>
                )}
                {!showForm && user && hasUserRating && (
                  <button
                    className="px-2 py-1 text-purple-100 font-bold"
                    onClick={() => setShowForm(true)}
                  >
                    Editar
                  </button>
                )}
                {!showForm && !user && (
                  <DialogLogin description="Faça login para deixar sua avaliação">
                    <button className="px-2 py-1 text-purple-100 font-bold">
                      Avaliar
                    </button>
                  </DialogLogin>
                )}
              </div>

              <div className="mt-4">
                {user && showForm && (
                  <RatingForm
                    user={user}
                    bookId={book.id}
                    rating={hasUserRating ? pages?.[0].ratings?.[0] : undefined}
                    onClose={() => setShowForm(false)}
                  />
                )}

                <ul className="mt-3 flex flex-col gap-3">
                  {pages?.map((page, index) => (
                    <div key={index} className="space-y-4">
                      {page.ratings.map((rating) => (
                        <li
                          key={rating.id}
                          className={`rounded-lg p-6 ${
                            rating.user.slug === user?.slug
                              ? "bg-gray-600"
                              : "bg-gray-700"
                          }`}
                        >
                          <RatingHeader
                            user={rating.user}
                            createdAt={rating.createdAt}
                            updatedAt={rating.updatedAt}
                            rate={rating.rate}
                          />

                          <p className="mt-5 text-gray-300">
                            {rating.description}
                          </p>
                        </li>
                      ))}
                    </div>
                  ))}
                </ul>

                {(isFetchingNextPage || isLoading) && (
                  <div className="mt-8 mx-auto border-t-2 border-b-2 border-white/70 rounded-full w-4 h-4 animate-spin" />
                )}
              </div>
            </div>

            <Dialog.Close asChild>
              <button
                className="absolute top-0 right-0 m-6 text-gray-400 transition-colors hover:text-gray-200"
                aria-label="Fechar"
              >
                <i className="ph ph-x text-2xl" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
