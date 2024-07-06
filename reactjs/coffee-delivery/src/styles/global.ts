import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(props) => props.theme['yellow-500']};
  }

  body {
    background: ${(props) => props.theme['gray-100']};
  }
  
  body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: ${(props) => props.theme['brown-400']};
  }

  h1, h2, h3 {
    font-family: 'Baloo 2', sans-serif;
    font-weight: 800;
    line-height: 130%;
  }

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  input {
    border: none;
    background-color: transparent;
    padding: 0.75rem;
    font-size: 0.875rem;
    background-color: ${(props) => props.theme['gray-300']};
    border-width: 1px;
    border-style: solid;
    border-color: ${(props) => props.theme['gray-400']};
    border-radius: 4px;
  }

  ::placeholder {
    color: ${(props) => props.theme['brown-200']};
  }

  /* Remover setas do input number: Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Remover setas do input number: Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
`
