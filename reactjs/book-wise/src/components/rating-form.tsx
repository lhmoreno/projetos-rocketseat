import { queryClient } from "@/lib/query-client";
import { InfiniteData, useMutation } from "@tanstack/react-query";
import { User } from "next-auth";
import { useState } from "react";
import Avatar from "./ui/avatar";
import { BookRatingsResponse } from "@/app/api/books/[bookId]/ratings/route";

type RatingFormProps = {
  user: User;
  bookId: string;
  rating?: Rating;
  onClose: () => void;
};

type Rating = {
  id: string;
  createdAt: string;
  updatedAt: string;
  rate: number;
  description: string;
  user: {
    name: string;
    slug: string;
    image: string;
  };
};

export function RatingForm({ user, bookId, rating, onClose }: RatingFormProps) {
  const [rate, setRate] = useState(rating?.rate ?? 0);
  const [description, setDescription] = useState(rating?.description ?? "");

  const { mutateAsync: createRatingFn, isPending: createRatingIsPending } =
    useMutation<
      Rating,
      Error,
      { rate: number; description: string },
      { previousRatings?: InfiniteData<BookRatingsResponse> }
    >({
      mutationFn: async (newData) => {
        const response = await fetch(`/api/books/${bookId}/ratings`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        });

        const data = await response.json();

        return data;
      },
      onMutate: ({ rate, description }) => {
        const tempId = Math.floor(Math.random() * 1000).toString();

        const { cached } = createRatingsDataOnCache({
          rate,
          description,
          user,
          id: tempId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        return { previousRatings: cached };
      },
      onSuccess(rating) {
        updateRatingsDataOnCache(rating);
      },
      onError(_, __, context) {
        if (context?.previousRatings) {
          queryClient.setQueryData<InfiniteData<BookRatingsResponse>>(
            ["bookRatings", bookId],
            context.previousRatings
          );
        }
      },
    });

  const { mutateAsync: updateRatingFn, isPending: updateRatingIsPending } =
    useMutation<
      Rating,
      Error,
      { id: string; rate: number; description: string },
      { previousRatings?: InfiniteData<BookRatingsResponse> }
    >({
      mutationFn: async (newData) => {
        const response = await fetch(`/api/books/${bookId}/ratings`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        });

        const data = await response.json();

        return data;
      },
      onMutate: (newData) => {
        if (rating) {
          const { cached } = updateRatingsDataOnCache({
            ...rating,
            ...newData,
            updatedAt: new Date().toISOString(),
          });

          return { previousRatings: cached };
        }
      },
      onSuccess(rating) {
        updateRatingsDataOnCache(rating);
      },
      onError(_, __, context) {
        if (context?.previousRatings) {
          queryClient.setQueryData<InfiniteData<BookRatingsResponse>>(
            ["bookRatings", bookId],
            context.previousRatings
          );
        }
      },
    });

  function createRatingsDataOnCache(data: Rating) {
    const cached = queryClient.getQueryData<InfiniteData<BookRatingsResponse>>([
      "bookRatings",
      bookId,
    ]);

    if (cached) {
      const restPages = cached.pages.slice(1);

      queryClient.setQueryData<InfiniteData<BookRatingsResponse>>(
        ["bookRatings", bookId],
        {
          ...cached,
          pages: [
            {
              ...cached.pages[0],
              ratings: [data, ...cached.pages[0].ratings],
            },
            ...restPages,
          ],
        }
      );
    }

    return { cached };
  }

  function updateRatingsDataOnCache(data: Rating) {
    const cached = queryClient.getQueryData<InfiniteData<BookRatingsResponse>>([
      "bookRatings",
      bookId,
    ]);

    if (cached) {
      const restPages = cached.pages.slice(1);
      const restRatings = cached.pages[0].ratings.slice(1);

      queryClient.setQueryData<InfiniteData<BookRatingsResponse>>(
        ["bookRatings", bookId],
        {
          ...cached,
          pages: [
            {
              ...cached.pages[0],
              ratings: [data, ...restRatings],
            },
            ...restPages,
          ],
        }
      );
    }

    return { cached };
  }

  async function handleSubmit() {
    if (rate === 0) {
      return alert("Preencha o campo estrelas");
    }

    if (description.trim().length < 3) {
      return alert("Sua avaliação tem menos de 3 letras");
    }

    if (updateRatingIsPending || createRatingIsPending) return;

    if (rating) {
      updateRatingFn({
        ...rating,
        rate,
        description: description.trim(),
      });
    } else {
      createRatingFn({ rate, description: description.trim() });
    }

    onClose();
  }

  return (
    <div className="bg-gray-700 rounded-lg p-6">
      <header className="flex items-center gap-4">
        <Avatar
          src={user.image}
          alt={`Foto de perfil do(a) ${user.name}`}
          size="md"
        />
        <strong>{user.name}</strong>
        <div className="flex-1 text-3xl text-purple-100 flex justify-end gap-1">
          <button onClick={() => setRate(1)}>
            <i className={`${rate > 0 ? "ph-fill" : "ph"} ph-star`} />
          </button>
          <button onClick={() => setRate(2)}>
            <i className={`${rate > 1 ? "ph-fill" : "ph"} ph-star`} />
          </button>
          <button onClick={() => setRate(3)}>
            <i className={`${rate > 2 ? "ph-fill" : "ph"} ph-star`} />
          </button>
          <button onClick={() => setRate(4)}>
            <i className={`${rate > 3 ? "ph-fill" : "ph"} ph-star`} />
          </button>
          <button onClick={() => setRate(5)}>
            <i className={`${rate > 4 ? "ph-fill" : "ph"} ph-star`} />
          </button>
        </div>
      </header>
      <div className="mt-6">
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          placeholder="Escreva sua avaliação"
          className="w-full h-48 px-5 py-3 border border-gray-500 rounded bg-gray-800 text-gray-200 resize-none placeholder:text-gray-400"
        />
        <div className="mt-3 flex justify-end gap-2">
          <button
            className="p-2 flex items-center justify-center bg-gray-600 rounded transition-colors hover:bg-gray-500"
            onClick={onClose}
          >
            <i className="ph ph-x text-purple-100 text-2xl" />
          </button>
          <button
            className="p-2 flex items-center justify-center bg-gray-600 rounded transition-colors hover:bg-gray-500"
            onClick={handleSubmit}
          >
            <i className="ph ph-check text-green-100 text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
