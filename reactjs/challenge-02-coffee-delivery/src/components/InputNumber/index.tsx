import { InputNumberContainer } from "./styles"
import { Minus, Plus } from "phosphor-react"

type InputNumberProps = {
  value: number
  onAdd: () => void
  onSubtract: () => void
}

export function InputNumber({ value, onAdd, onSubtract }: InputNumberProps) {
  return (
    <InputNumberContainer>
      <button onClick={onSubtract}>
        <Minus />
      </button>
      <span>{value}</span>
      <button onClick={onAdd}>
        <Plus />
      </button>
    </InputNumberContainer>
  )
}
