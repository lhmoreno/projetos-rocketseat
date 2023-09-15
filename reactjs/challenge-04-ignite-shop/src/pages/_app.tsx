import type { AppProps } from 'next/app'
import { CartProvider } from '../contexts/CartContext'

import '../styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default App
