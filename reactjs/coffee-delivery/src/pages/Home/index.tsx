import { 
  Coffees,
  InfoIcon,
  Intro, 
  IntroData, 
  IntroDetails 
} from "./styles"
import coffePng from "../../assets/coffe.png"
import { Coffee, Cube, ShoppingCart, Timer } from "phosphor-react"
import { Coffee as CoffeeComponent, CoffeeData } from "./components/Coffee"
import { useEffect, useState } from "react"

export function Home() {
  const [coffees, setCoffees] = useState<CoffeeData[]>([])

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:4000/coffees')
      const data = await response.json()

      setCoffees(data)
    })()
  }, [])

  return (
    <div>
      <Intro>
        <div>
          <IntroData>
            <h1>Encontre o café perfeito para qualquer hora do dia</h1>
            <span>Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora</span>
          </IntroData>
          <IntroDetails>
            <div>
              <InfoIcon className="orange">
              <ShoppingCart weight="fill" />
              </InfoIcon>
              Compra simples e segura
            </div>
            <div>
              <InfoIcon className="brown">
                <Cube weight="fill" />
              </InfoIcon>
              Embalagem mantém o café intacto
            </div>
            <div>
              <InfoIcon className="yellow">
                <Timer weight="fill" />
              </InfoIcon>
              Entrega rápida e rastreada
            </div>
            <div>
              <InfoIcon className="purple">
                <Coffee weight="fill" />
              </InfoIcon>
              O café chega fresquinho até você
            </div>
          </IntroDetails>
        </div>
        <img src={coffePng} alt="Um copo com grãos de café em volta" />
      </Intro>

      <Coffees>
        <h2>Nossos cafés</h2>
        <div>
          {coffees.map((coffee) => (
            <CoffeeComponent 
              key={coffee.id}
              coffee={coffee}
            />
          ))}
        </div>
      </Coffees>
    </div>
  )
}
