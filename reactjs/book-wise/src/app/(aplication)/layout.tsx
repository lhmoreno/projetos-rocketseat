import { getServerAuthSession } from "@/lib/auth";
import { SideBar } from "./sidebar";

export default async function AppLayout({ children }: React.PropsWithChildren) {
  const session = await getServerAuthSession();

  return (
    <div className="flex">
      <SideBar user={session?.user} />

      <div className="flex-1 max-w-5xl mx-auto pl-10 pr-5 py-14">
        {children}
      </div>
    </div>
  );
}
