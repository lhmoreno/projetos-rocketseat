import { useContext } from "react"
import { CartContext } from "../contexts/CartContext"

export function useCart() {
  const cartContext = useContext(CartContext)

  return cartContext
}
