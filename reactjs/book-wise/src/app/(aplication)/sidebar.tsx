"use client";

import DialogLogin from "@/components/dialog-login";
import Avatar from "@/components/ui/avatar";
import * as Dialog from "@radix-ui/react-alert-dialog";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  {
    name: "Início",
    href: "/feed",
    icon: "ph ph-chart-line-up",
  },
  {
    name: "Explorar",
    href: "/books",
    icon: "ph ph-binoculars",
  },
  {
    name: "Perfil",
    href: "/profile",
    icon: "ph ph-user",
  },
];

const linkStyles = {
  active:
    "rounded relative pl-8 py-3 flex items-center gap-3 font-bold before:absolute before:left-2 before:w-1 before:h-6 before:rounded-full before:bg-gradient-vertical",
  default:
    "rounded pl-8 py-3 flex items-center gap-3 text-gray-400 transition-colors hover:text-gray-300 hover:bg-gray-600/60",
};

export function SideBar({ user }: { user?: User }) {
  const pathname = usePathname();

  return (
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
        <nav className="w-full px-4 flex flex-col">
          {routes.map((route) => {
            let href = route.href;

            if (route.href === "/profile") {
              if (!user) {
                return null;
              } else {
                href = "/profile/" + user.slug;
              }
            }

            return (
              <Link
                key={route.name}
                href={href}
                className={
                  pathname.includes(route.href)
                    ? linkStyles.active
                    : linkStyles.default
                }
              >
                <i className={`${route.icon} text-2xl`} />
                {route.name}
              </Link>
            );
          })}
        </nav>
        {user ? (
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="group mt-auto mb-4 p-2 flex items-center gap-3 text-gray-200 transition-opacity">
                <Avatar
                  src={user.image ?? ""}
                  alt="Sua foto de perfil"
                  size="sm"
                />
                <p className="group-hover:opacity-80">{user.name}</p>
                <i className="ph ph-sign-out text-red-100 text-xl group-hover:opacity-80" />
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="bg-black/60 fixed inset-0 animate-dialogOverlay" />

              <Dialog.Content className="w-full max-w-lg bg-gray-700 rounded-xl fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 animate-dialogContent shadow-lg p-8">
                <Dialog.Title className="text-lg font-bold text-gray-200">
                  Tem certeza que deseja sair?
                </Dialog.Title>

                <div className="mt-10 flex gap-3 justify-end">
                  <Dialog.Cancel asChild>
                    <button className="px-6 py-3 bg-gray-600 rounded-lg text-gray-200 font-bold transition-colors hover:bg-gray-500">
                      Cancelar
                    </button>
                  </Dialog.Cancel>
                  <Dialog.Action asChild>
                    <button
                      className="px-6 py-3 bg-red-600 rounded-lg text-gray-200 font-bold transition-colors hover:bg-red-500"
                      onClick={() => signOut()}
                    >
                      Sim, quero sair
                    </button>
                  </Dialog.Action>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        ) : (
          <DialogLogin>
            <button className="mt-auto mb-4 p-2 flex items-center gap-3 text-gray-200 font-bold transition-opacity hover:opacity-80">
              Fazer login
              <i className="ph ph-sign-in text-green-100 text-xl" />
            </button>
          </DialogLogin>
        )}
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
  );
}
