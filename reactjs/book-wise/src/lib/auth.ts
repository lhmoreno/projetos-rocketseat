import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { PrismaAdapter as AuthPrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      slug: string;
      name: string;
      email: string;
      image: string;
    };
  }

  interface User {
    id: string;
    slug: string;
    name: string;
    email: string;
    image: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  pages: {
    error: "/",
    signIn: "/",
    newUser: "/",
  },
  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          slug: user.slug,
          id: user.id,
        },
      };
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);

export function PrismaAdapter(): Adapter {
  const adapter = AuthPrismaAdapter(prisma) as Adapter;

  return {
    ...adapter,
    async createUser(user) {
      const prismaUser = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          image: user.image,
          slug:
            user.name.toLocaleLowerCase().replaceAll(" ", "-") +
            "-" +
            Math.round(Math.random() * 99),
          authorsReadAmount: 0,
          booksPageReadAmount: 0,
          ratingedBooksAmount: 0,
          mostReadCategory: "Nenhuma",
        },
      });

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        slug: prismaUser.slug,
        email: prismaUser.email!,
        emailVerified: null,
        image: prismaUser.image!,
      };
    },
  };
}
