import { ReactNode, useEffect, useState } from "react"
import { CartCoffee, CartContext, DeliveryInfo } from "."
import { Toast, ToastData } from "../../components/Toast"
import { coffeeDeliveryApi } from "../../lib/axios"

type CartProps = {
  children: ReactNode
}

export function CartProvider({ children }: CartProps) {
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>()
  const [coffees, setCoffees] = useState<CartCoffee[]>([])
  const [cartId, setCartId] = useState(() => {
    const id = localStorage.getItem('@coffee-delivery:cartId-1.0.0')

    if (id) {
      return Number(id)
    } else {
      return null
    }
  })
  const [toast, setToast] = useState<ToastData>({
    title: '',
    description: ''
  })

  useEffect(() => {
    (async () => {
      if (!cartId) {
        const { data } = await coffeeDeliveryApi.post('/carts', {
          coffees: []
        })
        const newCartId = data.id as number
        setCartId(newCartId)
        localStorage.setItem('@coffee-delivery:cartId-1.0.0', String(newCartId))
      } else {
        const { data } = await coffeeDeliveryApi.get(`/carts/${cartId}`)
        setCoffees(data.coffees)
        setDeliveryInfo(data.deliveryInfo)
      }
    })()
  }, [])

  async function addCoffeeInCart(cartCoffee: CartCoffee) {
    if (cartId) {
      const coffee = coffees.find(({ id }) => id === cartCoffee.id)

      if (!coffee) {
        let updatedCoffees = [...coffees, cartCoffee]
        setCoffees(updatedCoffees)
        setToast({
          title: 'Adicionado',
          description: 'Muito bem! Este delicioso café agora está no carrinho ;)'
        })
        
        await coffeeDeliveryApi.put(`/carts/${cartId}`, {
          coffees: updatedCoffees
        })
      } else {
        setToast({
          title: 'Aviso',
          description: 'Este café não foi adicionado, pois ele já está no carrinho!'
        })
      }
    }
  }

  async function removeCoffeeInCartById(coffeeId: number) {
    if (cartId) {
      const updatedCoffees = coffees.filter(({ id }) => id !== coffeeId)
      setCoffees(updatedCoffees)
      
      await coffeeDeliveryApi.put(`/carts/${cartId}`, {
        coffees: updatedCoffees
      })
    }
  }

  function handleAddCoffeeQuantity(cartCoffee: CartCoffee) {
    let updatedCoffees = [...coffees]
    const coffeeIndex = coffees.findIndex(({ id }) => id === cartCoffee.id)

    updatedCoffees[coffeeIndex].quantity += 1
    setCoffees(updatedCoffees)
  }

  function handleSubtractCoffeeQuantity(cartCoffee: CartCoffee) {
    let updatedCoffees = [...coffees]
    const coffeeIndex = coffees.findIndex(({ id }) => id === cartCoffee.id)
    const quantity = updatedCoffees[coffeeIndex].quantity

    if (quantity > 1) {
      updatedCoffees[coffeeIndex].quantity -= 1
      setCoffees(updatedCoffees)
    }
  }

  async function clearCart(deliveryInfoData: DeliveryInfo) {
    if (cartId) {
      setCoffees([])
      setDeliveryInfo(deliveryInfoData)

      await coffeeDeliveryApi.put(`/carts/${cartId}`, {
        deliveryInfo: deliveryInfoData,
        coffees: []
      })
    }
  }

  return (
    <CartContext.Provider
      value={{
        coffees,
        deliveryInfo,
        addCoffeeInCart,
        removeCoffeeInCartById,
        handleAddCoffeeQuantity,
        handleSubtractCoffeeQuantity,
        clearCart
      }}
    >
      {children}
      <Toast 
        isOpen={!!toast.title}
        onClose={() => setToast(value => ({ ...value, title: '' }))}
        toast={toast}
      />
    </CartContext.Provider>
  )
}