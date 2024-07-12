import { Metadata } from "next";
import NotAuthenticated from "../not-authenticated";
import Profile from "../profile";
import { getServerAuthSession } from "@/lib/auth";
import { getProfileBySlug } from "@/app/api/profile/route";
import { notFound } from "next/navigation";
import { getRatingsByUserId } from "@/app/api/ratings/route";

interface PageProps {
  params: {
    slug: string;
  };
}

type GenerateMetadata = (props: PageProps) => Promise<Metadata>;

export const generateMetadata: GenerateMetadata = async ({ params }) => {
  const data = await getProfileBySlug(params.slug);

  if (!data) {
    return { title: "Book Wise" };
  }

  return {
    title: `${data.name} | Book Wise`,
  };
};

export default async function Page({ params }: PageProps) {
  const session = await getServerAuthSession();

  if (!session?.user) {
    return <NotAuthenticated />;
  }

  const data = await getProfileBySlug(params.slug);

  if (!data) {
    return notFound();
  }

  const ratings = await getRatingsByUserId(data.id);

  return <Profile data={data} ratings={ratings} />;
}
