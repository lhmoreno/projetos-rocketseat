interface RateStarsProps {
  rate: number
  className?: string
}

const numbers = Array.from(new Array(5), (_, i) => i + 1)

export default function RateStars({ rate, className = '' }: RateStarsProps) {
  return (
    <div className={`${className} text-purple-100 flex gap-1`}>
      {numbers.map((n) => {
        if (rate >= n) {
          return <i key={n} className="ph-fill ph-star" />
        }
        
        if (rate - n === -0.5) {
          return <i key={n} className="ph-fill ph-star-half" />
        }

        return <i key={n} className="ph ph-star" />
      })}
    </div>
  )
}
