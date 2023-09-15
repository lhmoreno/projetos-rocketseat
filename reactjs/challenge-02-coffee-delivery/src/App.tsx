import { ThemeProvider } from "styled-components"
import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"

import { GlobalStyle } from "./styles/global"
import { defaultTheme } from "./styles/themes/default"
import { CartProvider } from "./contexts/CartContext/Provider"
import * as RadixToast from "@radix-ui/react-toast"

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <RadixToast.Provider swipeDirection="left">
        <BrowserRouter>
          <CartProvider>
            <Router />
          </CartProvider>
        </BrowserRouter>


        <GlobalStyle />
        <RadixToast.Viewport />
      </RadixToast.Provider>
    </ThemeProvider>
  )
}

export default App
