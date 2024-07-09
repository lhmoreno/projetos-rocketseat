import { Metadata } from "next";
import NotAuthenticated from "./not-authenticated";
import Profile from "./profile";
import { getServerAuthSession } from "@/lib/auth";
import { getProfileByEmail } from "@/app/api/profile/route";

export const metadata: Metadata = {
  title: "Seu Perfil | Book Wise",
  description: "Veja seu perfil",
};

export default async function Page() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    return <NotAuthenticated />;
  }

  const data = await getProfileByEmail(session.user.email ?? "");

  if (!data) {
    return <NotAuthenticated />;
  }

  return <Profile data={data} />;
}
