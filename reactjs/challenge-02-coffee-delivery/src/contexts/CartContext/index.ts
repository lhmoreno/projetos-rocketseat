import { createContext } from "react"

export type CartCoffee = {
  id: number
  imageUrl: string
  title: string
  price: number
  quantity: number
}

export type DeliveryInfo = {
  cep: string
  street: string
  number: number
  complement: string
  district: string
  city: string
  uf: string
  payment: 'credit-card' | 'debit-card' | 'money'
}

type CartContextType = {
  coffees: CartCoffee[]
  deliveryInfo?: DeliveryInfo
  addCoffeeInCart: (cartCoffee: CartCoffee) => Promise<void>
  removeCoffeeInCartById: (coffeeId: number) => Promise<void>
  handleAddCoffeeQuantity: (cartCoffee: CartCoffee) => void
  handleSubtractCoffeeQuantity: (cartCoffee: CartCoffee) => void
  clearCart: (deliveryInfo: DeliveryInfo) => Promise<void>
}

export const CartContext = createContext({} as CartContextType)
