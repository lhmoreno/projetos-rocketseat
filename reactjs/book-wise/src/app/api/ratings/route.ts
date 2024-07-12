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

export async function getRatings({
  page,
}: {
  page: number;
}): Promise<RatingsPage> {
  const ratingsPerPage = 20;

  const ratingsAmount = await prisma.rating.count();
  const totalPages = Math.ceil(ratingsAmount / ratingsPerPage);

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

  const pageParam = params.get("page");

  if (pageParam && Number.isNaN(pageParam))
    return NextResponse.json({ message: "Invalid page." }, { status: 404 });

  const page = pageParam ? Number(pageParam) : 1;

  const ratings = await getRatings({ page });

  return NextResponse.json(ratings);
}

export async function getRatingsByUserId(userId: string): Promise<
  Array<
    Rating & {
      book: Book;
    }
  >
> {
  const ratings = await prisma.rating.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      book: true,
    },
  });

  return ratings;
}
