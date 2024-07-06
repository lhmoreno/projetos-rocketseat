import { 
  FieldsetPayment, 
  FieldsetUserData, 
  PaymentType, 
  PaymentTypeButton 
} from "./styles"
import { 
  Bank, 
  CreditCard, 
  CurrencyDollar, 
  MapPinLine, 
  Money 
} from "phosphor-react"
import { Controller, useFormContext } from "react-hook-form"
import { useEffect, useState } from "react"
import { IMaskInput } from "react-imask"
import { viaCepApi } from "../../../../lib/axios"


export function UserDeliveryForm() {
  const [hasValidCep, setHasValidCep] = useState(false)
  const { register, control, watch, setValue, resetField } = useFormContext()
  const cep = watch('cep')

  useEffect(() => {
    if (cep?.length === 9) {
      (async () => {
        const { data } = await viaCepApi.get(`/${cep}/json`)
        if (!data.erro) {
          setValue('street', data.logradouro)
          setValue('district', data.bairro)
          setValue('city', data.localidade)
          setValue('uf', data.uf)
          setHasValidCep(true)
        } else {
          resetField('street')
          resetField('district')
          resetField('city')
          resetField('uf')
          setHasValidCep(false)
        }
      })()
    }
  }, [cep])

  return (
    <>
      <FieldsetUserData>
        <legend>
          <MapPinLine />
          <div>
            <p>Endereço de Entrega</p>
            <p>Informe o endereço onde deseja receber seu pedido</p>
          </div>
        </legend>
        <div>
          <Controller 
            control={control}
            name="cep"
            render={({ field }) => {
              return (
                <IMaskInput 
                  mask="00000-000"
                  value={field.value}
                  onAccept={field.onChange}
                  // @ts-ignore: Unreachable code error
                  name={field.name}
                  placeholder="CEP"
                  minLength={9}
                  maxLength={9}
                  required
                />
              )
            }}
          />
          <input 
            type="text" 
            placeholder="Rua" 
            required
            disabled={hasValidCep}
            {...register('street')}
          />
          <input 
            type="number" 
            placeholder="Número" 
            required
            {...register('number', { valueAsNumber: true })}
          />
          <input 
            type="text" 
            placeholder="Complemento" 
            {...register('complement')}
          />
          <input 
            type="text" 
            placeholder="Bairro"
            required 
            disabled={hasValidCep}
            {...register('district')}
          />
          <input 
            type="text" 
            placeholder="Cidade"
            required 
            disabled={hasValidCep}
            {...register('city')}
          />
          <input 
            type="text" 
            placeholder="UF" 
            required
            minLength={2}
            maxLength={2}
            disabled={hasValidCep}
            {...register('uf')}
          />
        </div>
      </FieldsetUserData>

      <FieldsetPayment>
        <legend>
          <CurrencyDollar />
          <div>
            <p>Pagamento</p>
            <p>O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
          </div>
        </legend>

        <Controller 
          control={control}
          name="payment"
          render={({ field }) => {
            return (
              <PaymentType
                onValueChange={field.onChange}
                value={field.value}
              >
                <PaymentTypeButton value="credit-card">
                  <CreditCard />
                  Cartão de crédito
                </PaymentTypeButton>
                <PaymentTypeButton value="debit-card">
                  <Bank />
                  Cartão de débito
                </PaymentTypeButton>
                <PaymentTypeButton value="money">
                  <Money />
                  Dinheiro
                </PaymentTypeButton>
              </PaymentType>
            )
          }}
        />
      </FieldsetPayment>
    </>
  )
}
