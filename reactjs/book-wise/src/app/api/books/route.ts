import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const categories = searchParams.getAll("category");

  const books = await prisma.book.findMany({
    include: {
      categories: {
        include: {
          category: true,
        },
      },
      ratings: true,
    },
  });

  let filteredBooks = books;

  if (categories.length > 0) {
    filteredBooks = books.filter((book) =>
      book.categories.some((c) => categories.includes(c.category.name))
    );
  }

  const booksWithRate = filteredBooks.map((book) => {
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

  return NextResponse.json(booksWithRate);
}
