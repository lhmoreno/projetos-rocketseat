import './globals.css'
import '@phosphor-icons/web/regular/style.css'
import '@phosphor-icons/web/fill/style.css'

import { Nunito_Sans } from 'next/font/google'

const nunitoSans = Nunito_Sans({ 
  weight: ['400', '700'],
  subsets: ['latin'] 
})

export default function RootLayout({children}: React.PropsWithChildren) {
  return (
    <html lang="pt-BR">
      <body className={`${nunitoSans.className} bg-gray-800 text-gray-100`}>
        <div className="max-w-screen-2xl mx-auto">
          {children}
        </div>
      </body>
    </html>
  )
}
