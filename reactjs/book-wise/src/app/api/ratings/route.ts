import { prisma } from "@/lib/prisma";

export async function getRatings() {
  const ratings = await prisma.rating.findMany({
    include: {
      book: true,
      user: true,
    },
  });

  return ratings;
}
