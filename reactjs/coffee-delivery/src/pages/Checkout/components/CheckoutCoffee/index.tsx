import { Trash } from "phosphor-react"
import { InputNumber } from "../../../../components/InputNumber"
import { CartCoffee } from "../../../../contexts/CartContext"
import { priceFormatter } from "../../../../utils/formatter"
import { CheckoutCoffeeContainer, Coffee } from "./styles"

type CheckoutCoffeeProps = {
  coffee: CartCoffee
  onAddQuantity: () => void
  onSubtractQuantity: () => void
  onRemoveCoffee: () => void
}

export function CheckoutCoffee({ 
  coffee, 
  onAddQuantity,
  onSubtractQuantity,
  onRemoveCoffee 
}: CheckoutCoffeeProps) {
  return (
    <CheckoutCoffeeContainer>
      <Coffee>
        <img src={coffee.imageUrl} alt="" />
        <div>
          <p>{coffee.title}</p>
          <div>
            <InputNumber 
              value={coffee.quantity}
              onAdd={onAddQuantity}
              onSubtract={onSubtractQuantity}
            />
            <button onClick={onRemoveCoffee}>
              <Trash />
              Remover
            </button>
          </div>
        </div>
        <p>{priceFormatter.format(coffee.price * coffee.quantity)}</p>
      </Coffee>
  
      <hr />
    </CheckoutCoffeeContainer>
  )
}
