import { prisma } from "@/lib/prisma";
import { Book, Rating, User } from "@prisma/client";

export type Data = User & {
  ratingsAmount: number;
  pagesReaded: number;
  authorsReaded: number;
  ratings: Array<
    Rating & {
      book: Book & {
        rate: number;
        rateAmount: number;
      };
    }
  >;
};

export async function getProfileById(id: string) {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      ratings: {
        include: {
          book: {
            include: {
              ratings: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    return null;
  }

  const data: Data = {
    ...user,
    ratingsAmount: user.ratings.length,
    pagesReaded: user.ratings.reduce<number>((amount, rating) => {
      return (amount += rating.book.total_pages);
    }, 0),
    authorsReaded: user.ratings.reduce<[number, string[]]>(
      ([amount, authors], rating) => {
        if (authors.includes(rating.book.author)) {
          return [amount, authors];
        }

        return [(amount += 1), [...authors, rating.book.author]];
      },
      [0, []]
    )[0],
    ratings: user.ratings.map((rating) => {
      return {
        ...rating,
        book: {
          ...rating.book,
          rate: rating.book.ratings.reduce<number>((rate, rating, i, list) => {
            if (i === list.length - 1) {
              const amount = (rate += rating.rate);
              const avarage = amount / list.length;

              return Number(avarage.toFixed(1));
            }

            return (rate += rating.rate);
          }, 0),
          rateAmount: rating.book.ratings.length,
        },
      };
    }),
  };

  return data;
}

export async function getProfileByEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
    include: {
      ratings: {
        include: {
          book: true,
        },
      },
    },
  });

  if (!user) {
    return null;
  }

  const data: Data = {
    ...user,
    ratingsAmount: 0,
    pagesReaded: 0,
    authorsReaded: 0,
    ratings: user.ratings.map((rating) => {
      return {
        ...rating,
        book: {
          ...rating.book,
          rate: 0,
          rateAmount: 0,
        },
      };
    }),
  };

  return data;
}
