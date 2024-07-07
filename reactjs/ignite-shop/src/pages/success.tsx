import type { GetServerSideProps } from 'next'

import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import Stripe from 'stripe'

import { stripe } from '../lib/stripe'

type SuccessProps = {
  costumerName: string
  products: {
    name: string
    imageUrl: string
  }[]
}

export default function Success({ costumerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <div className="h-full pb-32 flex flex-col items-center justify-center mx-auto">
        <div
          className="relative flex h-36"
          style={{
            width: `${products.length * 9 - (products.length - 1) * 3}rem`
          }}
        >
          {products.map((product, index) => {
            return (
              <div
                key={index}
                className="absolute top-0 bottom-0 product-background-linear-gradient w-36 rounded-full flex items-center justify-center shadow-xl"
                style={{
                  left: `${index * 6}rem`
                }}
              >
                <Image src={product.imageUrl} width={108} height={108} alt="" />
              </div>
            )
          })}
        </div>

        <h1 className="mt-12 text-2xl font-bold">Compra efetuada</h1>

        <p className="mt-6 text-xl text-gray-200 max-w-[35rem] text-center">
          Uhuul <strong>{costumerName}</strong>, sua compra de {products.length}{' '}
          camisetas já está a caminho da sua casa.
        </p>

        <Link
          href="/"
          className="mt-16 text-lg font-bold text-green-500 transition-all hover:text-green-300"
        >
          Voltar ao catálogo
        </Link>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const costumerName = session.customer_details.name

  return {
    props: {
      costumerName,
      products: session.line_items.data.map(item => {
        const product = item.price.product as Stripe.Product

        return {
          name: product.name,
          imageUrl: product.images[0]
        }
      })
    }
  }
}
