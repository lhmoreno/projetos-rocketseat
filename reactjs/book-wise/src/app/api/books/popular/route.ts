import { prisma } from "@/lib/prisma";

export async function getPopularBooks() {
  const books = await prisma.book.findMany({
    include: {
      ratings: true,
    },
    orderBy: {
      ratings: {
        _count: "desc",
      },
    },
    take: 5,
  });

  const booksWithRate = books.map((book) => {
    return {
      id: book.id,
      name: book.name,
      author: book.author,
      cover_url: book.cover_url,
      rate: book.ratings.reduce<number>((rate, rating, i) => {
        if (i === book.ratings.length - 1) {
          const amount = (rate += rating.rate);
          const avarage = amount / book.ratings.length;

          return Number(avarage.toFixed(1));
        }

        return (rate += rating.rate);
      }, 0),
    };
  });

  return booksWithRate;
}
