import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { bookId: string } }
) {
  const book = await prisma.book.findFirst({
    where: {
      id: params.bookId,
    },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
      ratings: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!book) return;

  const bookWithRate = {
    ...book,
    categories: book.categories.map((c) => c.category.name),
    rate: book.ratings.reduce<number>((rate, rating, i) => {
      if (i === book.ratings.length - 1) {
        const amount = (rate += rating.rate);
        const avarage = amount / book.ratings.length;

        return Number(avarage.toFixed(1));
      }

      return (rate += rating.rate);
    }, 0),
    ratings: book.ratings,
  };

  return NextResponse.json(bookWithRate);
}
