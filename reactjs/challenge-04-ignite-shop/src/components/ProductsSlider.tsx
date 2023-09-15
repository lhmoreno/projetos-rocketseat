import { ReactNode, useEffect, useRef, useState } from 'react'

import { CaretIcon } from './icons/CaretIcon'

type ProductsSliderProps = {
  children: ReactNode[]
}

export function ProductsSlider({ children }: ProductsSliderProps) {
  const ulRef = useRef<HTMLUListElement>()
  const [indexActive, setIndexActive] = useState(0)

  function resizeList(index: number, smoothing?: boolean) {
    const ulWidth = ulRef.current.clientWidth
    const ulPaddingLeft = parseFloat(
      getComputedStyle(ulRef.current).getPropertyValue('padding-left')
    )
    const ulGap = parseFloat(
      getComputedStyle(ulRef.current).getPropertyValue('gap')
    )

    const liWidth = ulWidth / 2
    const firstScroll = ulPaddingLeft + liWidth / 2 + ulGap
    const productScroll = liWidth + ulGap

    let scrollTo = 0

    if (index === 1) {
      scrollTo = firstScroll
    } else {
      scrollTo = firstScroll + productScroll * (index - 1)
    }

    ulRef.current.scrollTo({
      left: scrollTo,
      behavior: smoothing ? 'smooth' : 'auto'
    })
  }

  useEffect(() => {
    function onResize() {
      resizeList(indexActive)
    }

    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [indexActive])

  function handleNextProduct() {
    const nextIndexActive = indexActive + 1

    if (nextIndexActive >= children.length) return

    resizeList(nextIndexActive, true)
    setIndexActive(nextIndexActive)
  }

  function handlePrevProduct() {
    const prevIndexActive = indexActive - 1

    if (prevIndexActive <= -1) return

    resizeList(prevIndexActive, true)
    setIndexActive(prevIndexActive)
  }

  return (
    <>
      <button
        className="absolute z-10 top-0 bottom-0 left-0 w-32 flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-900/0 text-gray-300 transition-all enabled:hover:text-gray-100 enabled:hover:from-gray-800 disabled:invisible"
        onClick={handlePrevProduct}
        disabled={indexActive === 0}
      >
        <CaretIcon direction="left" />
      </button>

      <ul
        ref={ulRef}
        className="h-full py-ul-products flex gap-12 flex-nowrap overflow-hidden"
      >
        {children.map((reactNode, index) => {
          return (
            <li key={index} className="min-w-[50vw]">
              {reactNode}
            </li>
          )
        })}
      </ul>

      <button
        className="absolute z-10 top-0 bottom-0 right-0 w-32 flex items-center justify-center bg-gradient-to-r from-gray-900/0 to-gray-900 text-gray-300 transition-all enabled:hover:text-gray-100 enabled:hover:to-gray-800 disabled:invisible"
        onClick={handleNextProduct}
        disabled={indexActive === children.length - 1}
      >
        <CaretIcon direction="right" />
      </button>
    </>
  )
}
