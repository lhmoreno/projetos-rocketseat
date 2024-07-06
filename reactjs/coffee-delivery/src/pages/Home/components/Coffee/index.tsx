import { ShoppingCart } from "phosphor-react"
import { useState } from "react"
import { InputNumber } from "../../../../components/InputNumber"
import { useCart } from "../../../../hooks/useCart"
import { priceOnlyFormatter } from "../../../../utils/formatter"
import { 
  CartButton,
  CoffeeContainer, Tags,  
} from "./styles"

export type CoffeeData = {
  id: number
  imageUrl: string
  title: string
  description: string
  price: number
  tags: string[]
}

type CoffeeProps = {
  coffee: CoffeeData
}

export function Coffee({ coffee }: CoffeeProps) {
  const [quantity, setQuantity] = useState(1)
  const { addCoffeeInCart } = useCart()

  function handleAddCoffeeInCart() {
    addCoffeeInCart({
      id: coffee.id,
      title: coffee.title,
      imageUrl: coffee.imageUrl,
      price: coffee.price,
      quantity
    })
    setQuantity(1)
  }

  return (
    <CoffeeContainer>
      <img src={coffee.imageUrl} alt="" />
      <Tags>
        {coffee.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </Tags>

      <h3>{coffee.title}</h3>
      <p>{coffee.description}</p>

      <footer>
        <span>R$ <strong>{priceOnlyFormatter.format(coffee.price)}</strong></span>
        <div>
          <InputNumber 
            value={quantity}
            onSubtract={() => setQuantity(value => {
              if (value > 1) {
                return value - 1
              } else {
                return value
              }
            })}
            onAdd={() => setQuantity(value => value + 1)}
          />
          <CartButton
            onClick={handleAddCoffeeInCart}
          >
            <ShoppingCart weight="fill" />
          </CartButton>
        </div>
      </footer>
    </CoffeeContainer>
  )
}
