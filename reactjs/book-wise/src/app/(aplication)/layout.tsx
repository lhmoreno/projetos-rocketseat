import Image from "next/image";
import { ButtonAccount } from "./button-account";
import { NavLinks } from "./nav-links";

export default function AppLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex">
      <div className="sticky top-0 h-screen w-60 pl-5 py-5">
        <div className="relative h-full w-60 rounded-xl overflow-hidden flex flex-col items-center gap-16">
          <Image
            src="/logo.svg"
            alt="Livro com um coração ao lado do nome BookWise"
            className="mt-10"
            width={128}
            height={32}
            quality={100}
            priority
          />
          <NavLinks />
          <ButtonAccount />
          <Image
            src="/images/backgrounds/background-sidebar.png"
            alt="Fundo cinza"
            className="-z-10 object-cover"
            quality={100}
            sizes="15rem"
            fill
            priority
          />
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto pl-10 pr-5 py-14">
        {children}
      </div>
    </div>
  );
}
