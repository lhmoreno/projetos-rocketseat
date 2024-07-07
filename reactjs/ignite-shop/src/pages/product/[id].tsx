import type { GetStaticPaths, GetStaticProps } from 'next'

import Image from 'next/image'
import Head from 'next/head'
import Stripe from 'stripe'

import { stripe } from '../../lib/stripe'
import { handleCurrencyBRL } from '../../utils/currency'
import { useCart } from '../../hooks/useCart'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const { addProduct } = useCart()

  return (
    <>
      <Head>
        <title>{`${product.name} | Ignite Shop`}</title>
      </Head>

      <div className="w-full h-full px-8 pb-32 grid grid-cols-2 items-stretch gap-16 max-w-screen-2xl mx-auto">
        <div className="product-background-linear-gradient h-full flex items-center justify-center rounded-lg">
          <Image src={product.imageUrl} width={520} height={520} alt="" />
        </div>

        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-200">{product.name}</h1>

          <span className="mt-4 text-2xl text-green-300">
            {handleCurrencyBRL(product.price)}
          </span>

          <p className="mt-10 text-gray-200">{product.description}</p>

          <button
            className="mt-auto bg-green-500 px-8 py-4 text-white font-bold rounded-lg transition-all enabled:hover:bg-green-300 disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={() => addProduct(product)}
          >
            Comprar agora
          </button>
        </div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_NfApMy5iw9p6DP' } }],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params
}) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount,
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1 // 1 hours
  }
}
