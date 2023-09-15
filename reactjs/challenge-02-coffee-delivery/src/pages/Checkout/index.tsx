import { priceFormatter } from "../../utils/formatter"
import { UserDeliveryForm } from "./components/UserDeliveryForm"
import { PageSuccess } from "./components/PageSuccess"
import { 
  CheckoutContainer, 
  ConfirmationContainer, 
  Values,
} from "./styles"
import * as z from "zod"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCart } from "../../hooks/useCart"
import { CheckoutCoffee } from "./components/CheckoutCoffee"
import { useEffect, useState } from "react"

const userDeliveryFormSchema = z.object({
  cep: z.string().length(9),
  street: z.string(),
  number: z.number(),
  complement: z.string(),
  district: z.string(),
  city: z.string(),
  uf: z.string(),
  payment: z.enum(['credit-card', 'debit-card', 'money'])
})

type UserDeliveryFormInputs = z.infer<typeof userDeliveryFormSchema>

export function Checkout() {
  const { 
    coffees, 
    deliveryInfo,
    removeCoffeeInCartById,
    handleAddCoffeeQuantity,
    handleSubtractCoffeeQuantity,
    clearCart 
  } = useCart()
  const userDeliveryForm = useForm<UserDeliveryFormInputs>({
    resolver: zodResolver(userDeliveryFormSchema),
    defaultValues: {
      payment: 'credit-card'
    }
  })
  const [deliveryFee, setDeliveryFee] = useState(0)
  const [succeesfulRequest, setSucceesfulRequest] = useState(false)
  
  const { handleSubmit, watch, setValue } = userDeliveryForm
  const cep = watch('cep')
  const coffeeListIsEmpty = coffees.length === 0
  
  const price = coffees.reduce((acc, coffee) => {
    acc.coffees += coffee.price * coffee.quantity
    acc.total += coffee.price * coffee.quantity

    return acc
  }, {
    coffees: 0,
    total: deliveryFee
  })

  useEffect(() => {
    if (deliveryInfo) {
      setValue('cep', deliveryInfo.cep)
      setValue('street', deliveryInfo.street)
      setValue('number', deliveryInfo.number)
      setValue('complement', deliveryInfo.complement)
      setValue('district', deliveryInfo.district)
      setValue('city', deliveryInfo.city)
      setValue('uf', deliveryInfo.uf)
      setValue('payment', deliveryInfo.payment)
    }
  }, [deliveryInfo])

  useEffect(() => {
    if (cep?.length === 9) {
      setDeliveryFee(Math.floor(Math.random() * 5))
    }
  }, [cep])

  function handleSubmitUserDeliveryForm(data: UserDeliveryFormInputs) {
    if (!coffeeListIsEmpty) {
      setSucceesfulRequest(true)
      clearCart(data)
    }
  }

  if (succeesfulRequest) {
    return <PageSuccess />
  }

  return (
    <CheckoutContainer>
      <div>
        <h3>Complete seu pedido</h3>

        <form 
          id="form-delivery" 
          onSubmit={handleSubmit(handleSubmitUserDeliveryForm)}
        >
          <FormProvider {...userDeliveryForm}>
            <UserDeliveryForm />
          </FormProvider>
        </form>
      </div>
      <div>
        <h3>Cafés selecionados</h3>

        <ConfirmationContainer>
          {coffees.map((coffee) => (
            <CheckoutCoffee 
              key={coffee.id} 
              coffee={coffee}
              onAddQuantity={() => handleAddCoffeeQuantity(coffee)} 
              onSubtractQuantity={() => handleSubtractCoffeeQuantity(coffee)}
              onRemoveCoffee={() => removeCoffeeInCartById(coffee.id)}
            />
          ))}
          <Values>
            <div>
              <p>Total de itens</p>
              <p>
                {!coffeeListIsEmpty ? 
                  priceFormatter.format(price.coffees)
                  :
                  'Nenhum café adicionado'
                }
              </p>
            </div>
            <div>
              <p>Entrega</p>
              <p>
                {!coffeeListIsEmpty ? 
                  priceFormatter.format(deliveryFee)
                  :
                  'Nenhum café adicionado'
                }
              </p>
            </div>
            <div className="total">
              <p>Total</p>
              <p>
                {!coffeeListIsEmpty ? 
                  priceFormatter.format(price.total)
                  :
                  'Nenhum café adicionado'
                }
              </p>
            </div>
          </Values>
          <button
            type="submit"
            form="form-delivery"
          >
            Confirmar pedido
          </button>
        </ConfirmationContainer>
      </div>
    </CheckoutContainer>
  )
}
