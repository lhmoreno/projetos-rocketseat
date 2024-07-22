import { prisma } from "@/lib/prisma";

export async function getPopularBooks() {
  const books = await prisma.book.findMany({
    orderBy: {
      ratings: {
        _count: "desc",
      },
    },
    take: 5,
  });

  return books;
}
