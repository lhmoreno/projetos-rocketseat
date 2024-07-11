import { Metadata } from "next";
import NotAuthenticated from "./not-authenticated";
import { getServerAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Seu Perfil | Book Wise",
  description: "Veja seu perfil",
};

export default async function Page() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    return <NotAuthenticated />;
  }

  redirect("/profile/" + session.user.slug);
}
