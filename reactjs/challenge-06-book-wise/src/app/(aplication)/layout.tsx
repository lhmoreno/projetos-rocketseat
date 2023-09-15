import { AuthProvider } from '@/contexts/AuthContext'
import Image from 'next/image'

import NavigationLinks from './components/NavigationLinks'
import ButtonUserAccount from './components/ButtonUserAccount'
import { SidePanelProvider } from '@/contexts/SidePanelContext'

export default function AppLayout({ children }: React.PropsWithChildren) {
  return (
    <AuthProvider>
      <SidePanelProvider>
        <div className="flex">
          {/* SideBar */}
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
              <NavigationLinks />
              <ButtonUserAccount />
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

          {/* Page */}
          <div className="flex-1 max-w-5xl mx-auto pl-10 pr-5 py-14">
            {children}
          </div>
        </div>
      </SidePanelProvider>
    </AuthProvider>
  )
}
