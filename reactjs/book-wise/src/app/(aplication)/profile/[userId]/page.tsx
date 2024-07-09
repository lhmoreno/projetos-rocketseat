import { Metadata } from "next";
import NotAuthenticated from "../not-authenticated";
import Profile from "../profile";
import { getServerAuthSession } from "@/lib/auth";
import { getProfileById } from "@/app/api/profile/route";

interface PageProps {
  params: {
    userId: string;
  };
}

type GenerateMetadata = (props: PageProps) => Promise<Metadata>;

export const generateMetadata: GenerateMetadata = async ({ params }) => {
  const data = await getProfileById(params.userId ?? "");

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

  const data = await getProfileById(params.userId ?? "");

  if (!data) {
    return <NotAuthenticated />;
  }

  return <Profile data={data} />;
}
