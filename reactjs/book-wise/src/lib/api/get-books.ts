import { prisma } from "@/lib/prisma";

export async function getBooks() {
  const books = await prisma.book.findMany();

  return books;
}
