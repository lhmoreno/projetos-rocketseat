import { prisma } from "@/lib/prisma";
import { Book, Rating, User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export type RatingList = Array<
  Rating & {
    book: Book;
    user: User;
  }
>;

export type RatingsPage = {
  ratings: RatingList;
  nextPage?: number;
};

export async function getRatings(page: number = 1): Promise<RatingsPage> {
  const ratingsPerPage = 20;

  const ratingsAmount = await prisma.rating.count();
  const totalPages = Math.ceil(ratingsAmount / 20);

  if (page > totalPages) {
    return { ratings: [] };
  }

  const ratings = await prisma.rating.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      book: true,
      user: true,
    },
    skip: ratingsPerPage * (page - 1),
    take: ratingsPerPage,
  });

  const nextPage = totalPages > page ? page + 1 : undefined;

  return { ratings, nextPage };
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  const param = params.get("page");

  if (!param || Number.isNaN(param))
    return NextResponse.json([], { status: 404 });

  const page = Number(param);

  const ratings = await getRatings(page);

  return NextResponse.json(ratings);
}
