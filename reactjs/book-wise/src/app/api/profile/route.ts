import { prisma } from "@/lib/prisma";

export async function getProfileBySlug(slug: string) {
  const user = await prisma.user.findFirst({
    where: {
      slug,
    },
  });

  return user;
}
