import { Location, HeaderContainer } from "./styles"
import { MapPin, ShoppingCart } from "phosphor-react"

import logoSvg from "../../assets/logo.svg"
import { NavLink } from "react-router-dom"
import { useCart } from "../../hooks/useCart"

export function Header() {
  const { coffees } = useCart()

  const coffeesQuantity = coffees.length

  return (
    <HeaderContainer>
      <NavLink to="/">
        <img src={logoSvg} alt="" />
      </NavLink>

      <div>
        <Location>
          <MapPin weight="fill" />
          Itararé, SP
        </Location>
        <NavLink to="/checkout" title="Checkout">
          {coffeesQuantity > 0 && <span>{coffeesQuantity}</span>}
          <ShoppingCart weight="fill" />
        </NavLink>
      </div>
    </HeaderContainer>
  )
}
