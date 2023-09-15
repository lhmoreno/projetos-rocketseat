'use client'

import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const routes = [
  {
    name: 'Início',
    href: '/feed',
    icon: 'ph ph-chart-line-up'
  },
  {
    name: 'Explorar',
    href: '/books',
    icon: 'ph ph-binoculars'
  },
  {
    name: 'Perfil',
    href: '/profile',
    icon: 'ph ph-user',
    private: true
  }
]

const linkStyles = {
  active: 'rounded relative pl-8 py-3 flex items-center gap-3 font-bold before:absolute before:left-2 before:w-1 before:h-6 before:rounded-full before:bg-gradient-vertical',
  default: 'rounded pl-8 py-3 flex items-center gap-3 text-gray-400 transition-colors hover:text-gray-300 hover:bg-gray-600/60'
}

export default function NavigationLinks() {
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <nav className="w-full px-4 flex flex-col">
      {routes.map(route => {
        if (route.private && !user) return null

        return (
          <Link 
            key={route.name} 
            href={route.href}
            className={pathname.includes(route.href) ? linkStyles.active : linkStyles.default}
          >
            <i className={`${route.icon} text-2xl`} />
            {route.name}
          </Link>
        )
      })}
    </nav>
  )
}
