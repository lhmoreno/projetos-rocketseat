import type { GetStaticProps } from 'next'

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Stripe from 'stripe'

import { stripe } from '../lib/stripe'

import { BagIcon } from '../components/icons/BagIcon'
import { handleCurrencyBRL } from '../utils/currency'
import { useCart } from '../hooks/useCart'
import { ProductsSlider } from '../components/ProductsSlider'

export type Product = {
  id: string
  name: string
  imageUrl: string
  price: number
  defaultPriceId: string
}

type StoreProps = {
  products: Product[]
}

export default function Store({ products }: StoreProps) {
  const { addProduct } = useCart()

  return (
    <>
      <Head>
        <title>Ignite Shop</title>
      </Head>

      <main className="h-full pb-32">
        <ProductsSlider>
          {products.map(product => {
            return (
              <div
                key={product.id}
                className="group relative h-full product-background-linear-gradient rounded-lg flex items-center justify-center overflow-hidden"
              >
                <Link href={`/product/${product.id}`} className="h-full">
                  <Image
                    priority
                    src={product.imageUrl}
                    width={400}
                    height={400}
                    className="w-full h-full object-contain"
                    alt=""
                  />
                </Link>

                <footer className="absolute bottom-1 left-1 right-1 p-5 opacity-0 translate-y-[110%] rounded flex items-center justify-between bg-gray-900/90 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="flex flex-col gap-1">
                    <strong className="text-lg">{product.name}</strong>
                    <span className="text-xl font-bold text-green-300">
                      {handleCurrencyBRL(product.price)}
                    </span>
                  </div>
                  <button
                    className="p-3 rounded bg-green-500 text-white flex items-center justify-center transition-all hover:bg-green-300"
                    onClick={() => addProduct(product)}
                  >
                    <BagIcon />
                  </button>
                </footer>
              </div>
            )
          })}
        </ProductsSlider>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products: Product[] = data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
      defaultPriceId: price.id
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }
}
