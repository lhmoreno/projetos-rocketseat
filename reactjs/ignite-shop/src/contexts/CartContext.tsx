import type { Product } from '../pages'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createContext, PropsWithChildren, useEffect, useState } from 'react'

import { BagIcon } from '../components/icons/BagIcon'
import { CloseIcon } from '../components/icons/CloseIcon'
import { LogoSvg } from '../components/LogoSvg'
import { handleCurrencyBRL } from '../utils/currency'

type CartContextProps = {
  products: Product[]
  addProduct: (product: Product) => void
}

export const CartContext = createContext({} as CartContextProps)

export function CartProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<Product[]>([])
  const [showSidebarCart, setShowSidebarCart] = useState(false)
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)
  const { pathname } = useRouter()

  const hasProducts = !!products.length
  const priceAmount = products.reduce((amount, product) => {
    return amount + product.price
  }, 0)

  useEffect(() => {
    setShowSidebarCart(false)
  }, [pathname])

  function addProduct(product: Product) {
    setProducts(value => {
      if (value.find(({ id }) => id === product.id)) return value

      return [...value, product]
    })

    setShowSidebarCart(true)
  }

  function removeProduct(productId: string) {
    setProducts(value => {
      const updatedProducts = [...value].filter(({ id }) => id !== productId)

      if (!!!updatedProducts.length) setShowSidebarCart(false)

      return updatedProducts
    })
  }

  function handleOpenModal() {
    setShowSidebarCart(true)
  }

  function handleCloseModal() {
    setShowSidebarCart(false)
  }

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          priceIds: products.map(({ defaultPriceId }) => defaultPriceId)
        })
      })

      const { checkoutUrl } = await response.json()

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <CartContext.Provider
      value={{
        products,
        addProduct
      }}
    >
      <div className="flex flex-col h-screen">
        <header className="w-full max-w-screen-2xl mx-auto py-8 px-8 flex justify-between z-20">
          <Link href="/">
            <LogoSvg />
          </Link>
          <button
            className="relative w-12 h-12 rounded flex justify-center items-center bg-gray-800 text-gray-200 enabled:hover:opacity-80 disabled:text-gray-300"
            onClick={handleOpenModal}
            disabled={!hasProducts}
          >
            {hasProducts && (
              <span className="absolute w-7 h-7 top-[-0.75rem] right-[-0.75rem] pt-[1.5px] flex items-center justify-center align-middle rounded-full text-xs font-bold bg-green-500 text-white border-4 border-gray-900">
                {products.length}
              </span>
            )}
            <BagIcon />
          </button>
        </header>

        {children}
      </div>

      <div
        className="absolute top-0 bottom-0 right-0 w-[30rem] flex flex-col justify-between p-12 bg-gray-800 shadow-2xl z-30"
        style={{ display: showSidebarCart ? 'flex' : 'none' }}
      >
        <button
          className="ml-auto text-gray-300 transition-all hover:text-gray-200"
          onClick={handleCloseModal}
        >
          <CloseIcon width="1.25rem" height="1.25rem" />
        </button>

        <strong className="mt-6 text-lg font-bold">Sacola de compras</strong>

        <div className="mt-8 flex flex-col gap-6">
          {products.map(product => {
            return (
              <div key={product.id} className="flex gap-5">
                <div className="product-background-linear-gradient h-24 w-24 flex items-center justify-center rounded-lg">
                  <Image src={product.imageUrl} width={88} height={88} alt="" />
                </div>

                <div className="flex flex-col">
                  <p className="text-gray-200">{product.name}</p>
                  <strong className="mt-0.5">
                    {handleCurrencyBRL(product.price)}
                  </strong>
                  <button
                    className="block mt-auto w-min font-bold text-sm text-green-500 transition-all hover:text-green-300"
                    onClick={() => removeProduct(product.id)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-auto">
          <div className="flex justify-between">
            <span className="text-sm">Quantidade</span>
            <span className="text-gray-200">{products.length} items</span>
          </div>
          <div className="mt-1 flex justify-between">
            <span className="font-bold">Valor total</span>
            <span className="text-xl font-bold">
              {handleCurrencyBRL(priceAmount)}
            </span>
          </div>

          <button
            className="mt-14 w-full bg-green-500 px-8 py-4 text-white font-bold rounded-lg transition-all enabled:hover:bg-green-300 disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={handleCheckout}
            disabled={isCreatingCheckoutSession}
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </CartContext.Provider>
  )
}
