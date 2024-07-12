import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Rating as PrismaRating, User as PrismaUser } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export type BookRatingsResponse = {
  ratings: Rating[];
  nextPage?: number;
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

export async function GET(
  req: NextRequest,
  { params }: { params: { bookId: string } }
) {
  const searchParams = req.nextUrl.searchParams;

  const pageParam = searchParams.get("page");

  if (pageParam && Number.isNaN(pageParam))
    return NextResponse.json({ message: "Invalid page." }, { status: 404 });

  const page = pageParam ? Number(pageParam) : 1;
  const bookId = params.bookId;
  const ratingsPerPage = 10;

  const session = await getServerAuthSession();
  const user = session?.user;

  const ratingsAmount = await prisma.rating.count({
    where: {
      bookId,
    },
  });

  const totalPages = Math.ceil(ratingsAmount / ratingsPerPage);

  if (page > totalPages) {
    const response: BookRatingsResponse = { ratings: [] };

    return NextResponse.json(response);
  }

  const ratings = await prisma.rating.findMany({
    where: {
      bookId,
      userId: {
        not: user?.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
    skip: ratingsPerPage * (page - 1),
    take: ratingsPerPage,
  });

  const nextPage = totalPages > page ? page + 1 : undefined;

  let response: BookRatingsResponse = {
    ratings: mapper.many(ratings),
    nextPage,
  };

  if (user && page === 1) {
    const userRating = await prisma.rating.findFirst({
      where: {
        userId: user.id,
        bookId,
      },
      include: {
        user: true,
      },
    });

    if (userRating) {
      response = {
        ...response,
        ratings: [mapper.one(userRating), ...response.ratings],
      };
    }
  }

  return NextResponse.json(response);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { bookId: string } }
) {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json(
      { message: "Not authenticated." },
      { status: 401 }
    );
  }

  const user = session.user;
  const bookId = params.bookId;
  const body = await req.json();

  const rate = body.rate as number;
  const description = body.description as string;

  if (typeof rate !== "number") {
    return NextResponse.json(
      { message: "Rate not found or invalid." },
      { status: 400 }
    );
  }

  if (typeof description !== "string") {
    return NextResponse.json(
      { message: "Description not found or invalid." },
      { status: 400 }
    );
  }

  const userRatings = await prisma.rating.findMany({
    where: {
      userId: user.id,
    },
    include: {
      book: true,
    },
  });

  const hasRating = !!userRatings.find((rating) => rating.bookId === bookId);

  if (hasRating) {
    return NextResponse.json(
      { message: "You has already rated this book." },
      { status: 400 }
    );
  }

  const book = await prisma.book.findFirst({
    where: {
      id: bookId,
    },
  });

  if (!book) {
    return NextResponse.json({ message: "Book not found." }, { status: 400 });
  }

  const ratingPromise = prisma.rating.create({
    data: {
      rate,
      description,
      userId: user.id,
      bookId,
    },
  });

  const newRatingsAmount = book.ratingsAmount + 1;

  const bookPromise = prisma.book.update({
    where: {
      id: bookId,
    },
    data: {
      ratingsAmount: newRatingsAmount,
      rate: (book.rate * book.ratingsAmount + rate) / newRatingsAmount,
    },
  });

  userRatings.push({
    rate,
    description,
    userId: user.id,
    bookId,
    book,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: "123",
  });

  const { authorsReadAmount, booksPageReadAmount, mostReadCategory } =
    userRatings.reduce(
      (result, rating, index) => {
        const newResult = result;

        const book = rating.book;
        const categories = book.categories as string[];

        if (!result.authors.includes(book.author)) {
          newResult.authors = [...newResult.authors, book.author];
          newResult.authorsReadAmount += 1;
        }

        categories.forEach((category) => {
          const index = newResult.categoriesCount.findIndex(
            (c) => c.category === category
          );

          if (index >= 0) {
            newResult.categoriesCount[index].count += 1;
          } else {
            newResult.categoriesCount.push({
              category,
              count: 1,
            });
          }
        });

        if (index === userRatings.length - 1) {
          newResult.mostReadCategory = newResult.categoriesCount.reduce(
            (max, item) => (item.count > max.count ? item : max),
            newResult.categoriesCount[0]
          ).category;
        }

        newResult.booksPageReadAmount += book.totalPages;

        return newResult;
      },
      {
        authorsReadAmount: 0,
        booksPageReadAmount: 0,
        mostReadCategory: "",
        authors: [""],
        categoriesCount: [{ category: "Nenhuma", count: 0 }],
      }
    );

  const userPromise = prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      authorsReadAmount,
      booksPageReadAmount,
      mostReadCategory,
      ratingedBooksAmount: userRatings.length,
    },
  });

  const [rating, prismaUser] = await prisma.$transaction([
    ratingPromise,
    userPromise,
    bookPromise,
  ]);

  const response = mapper.one({ ...rating, user: prismaUser });

  return NextResponse.json(response);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { bookId: string } }
) {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json(
      { message: "Not authenticated." },
      { status: 401 }
    );
  }

  const user = session.user;
  const bookId = params.bookId;
  const body = await req.json();

  const rate = body.rate as number;
  const description = body.description as string;
  const id = body.id as string;

  if (typeof rate !== "number") {
    return NextResponse.json(
      { message: "Rate not found or invalid." },
      { status: 400 }
    );
  }

  if (typeof description !== "string") {
    return NextResponse.json(
      { message: "Description not found or invalid." },
      { status: 400 }
    );
  }

  if (typeof description !== "string") {
    return NextResponse.json(
      { message: "Description not found or invalid." },
      { status: 400 }
    );
  }

  if (typeof id !== "string") {
    return NextResponse.json(
      { message: "Id not found or invalid." },
      { status: 400 }
    );
  }

  const rating = await prisma.rating.findFirst({
    where: {
      id,
    },
  });

  if (!rating) {
    return NextResponse.json({ message: "Rating not found." }, { status: 400 });
  }

  const book = await prisma.book.findFirst({
    where: {
      id: bookId,
    },
  });

  if (!book) {
    return NextResponse.json({ message: "Book not found." }, { status: 400 });
  }

  const bookPromise = prisma.book.update({
    where: {
      id: bookId,
    },
    data: {
      rate:
        (book.rate * book.ratingsAmount - rating.rate + rate) /
        book.ratingsAmount,
    },
  });

  const ratingPromise = prisma.rating.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      rate,
      description,
      userId: user.id,
      bookId,
    },
    include: {
      user: true,
    },
  });

  const [prismaRating] = await prisma.$transaction([
    ratingPromise,
    bookPromise,
  ]);

  const response = mapper.one(prismaRating);

  return NextResponse.json(response);
}

const mapper = {
  one(rating: PrismaRating & { user: PrismaUser }): Rating {
    return {
      id: rating.id,
      createdAt: rating.createdAt.toISOString(),
      updatedAt: rating.updatedAt.toISOString(),
      rate: rating.rate,
      description: rating.description,
      user: {
        name: rating.user.name,
        slug: rating.user.slug,
        image: rating.user.image,
      },
    };
  },
  many(ratings: Array<PrismaRating & { user: PrismaUser }>): Rating[] {
    return ratings.map((rating) => ({
      id: rating.id,
      createdAt: rating.createdAt.toISOString(),
      updatedAt: rating.updatedAt.toISOString(),
      rate: rating.rate,
      description: rating.description,
      user: {
        name: rating.user.name,
        slug: rating.user.slug,
        image: rating.user.image,
      },
    }));
  },
};
