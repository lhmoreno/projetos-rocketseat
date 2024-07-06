import styled from "styled-components"

export const CheckoutCoffeeContainer = styled.div`
  > hr {
    border: 0;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: ${(props) => props.theme['gray-400']};
    margin: 1.5rem 0;
  }
`

export const Coffee = styled.div`
  display: flex;
  gap: 1.25rem;

  > img {
    width: 2.5rem;
    height: 2.5rem;
    align-self: center;
  }

  > div {
    width: 100%;
  }

  > div > p {
    color: ${(props) => props.theme['brown-600']};
    margin-bottom: 0.5rem;
  }

  > div > div {
    display: flex;
    gap: 0.5rem;
  }

  > div > div > button {
    height: 2rem;
    padding: 0 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
    background-color: ${(props) => props.theme['gray-400']};
    border-radius: 6px;
    font-size: 0.75rem;
    text-transform: uppercase;
  }

  > div > div > button:hover {
    background-color: ${(props) => props.theme['gray-500']};
  }

  > div > div > button svg {
    width: 1rem;
    height: 1rem;
    color: ${(props) => props.theme['purple-500']};
  }

  > p {
    min-width: fit-content;
    font-weight: 700;
  }
`
