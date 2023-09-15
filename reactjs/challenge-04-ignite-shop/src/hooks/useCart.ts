import { useContext } from 'react'

import { CartContext } from '../contexts/CartContext'

export function useCart() {
  const ctx = useContext(CartContext)

  return ctx
}
