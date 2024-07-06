import { 
  DeliveryContainer, 
  InfoIcon, 
  Infos, 
  PageSuccessContainer, 
} from "./styles"
import motoDeliverySvg from "../../../../assets/moto-delivery.svg"
import { CurrencyDollar, MapPin, Timer } from "phosphor-react"
import { useCart } from "../../../../hooks/useCart"

export function PageSuccess() {
  const { deliveryInfo } = useCart()

  const street = deliveryInfo?.street
  const number = deliveryInfo?.number
  const district = deliveryInfo?.district
  const city = deliveryInfo?.city
  const uf = deliveryInfo?.uf
  const payment = deliveryInfo?.payment

  const paymentCreditCard = payment === 'credit-card' && 'Cartão de Crédito'
  const paymentDebitCard = payment === 'debit-card' && 'Cartão de Débito'
  const paymentMoney = payment === 'money' && 'Dinheiro'

  const randomMinutes = Math.floor(Math.random() * 40)
  const minDeliveryMinutes = randomMinutes - randomMinutes % 5
  const maxDeliveryMinutes = minDeliveryMinutes + 10

  return (
    <PageSuccessContainer>
      <div>
        <h2>Uhu! Pedido confirmado</h2>
        <span>Agora é só aguardar que logo o café chegará até você</span>
      </div>

      <DeliveryContainer>
        <Infos>
          <div>
            <InfoIcon className="purple">
              <MapPin weight="fill" />
            </InfoIcon>
            <div>
              <p>Entrega em <strong>{`${street}, ${number}`}</strong></p>
              <p>{`${district} - ${city}, ${uf}`}</p>
            </div>
          </div>

          <div>
            <InfoIcon className="yellow">
              <Timer weight="fill" />
            </InfoIcon>
            <div>
              <p>Previsão de entrega</p>
              <strong>{`${minDeliveryMinutes} min - ${maxDeliveryMinutes} min`}</strong>
            </div>
          </div>
          
          <div>
            <InfoIcon className="orange">
              <CurrencyDollar weight="fill" />
            </InfoIcon>
            <div>
              <p>Forma de pagamento</p>
              <strong>
                {paymentCreditCard && paymentCreditCard}
                {paymentDebitCard && paymentDebitCard}
                {paymentMoney && paymentMoney}
              </strong>
            </div>
          </div>
        </Infos>

        <img src={motoDeliverySvg} alt="" />
      </DeliveryContainer>
    </PageSuccessContainer>
  )
}
