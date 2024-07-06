import styled from "styled-components"

export const CheckoutContainer = styled.div`
  margin-top: 2.5rem;
  display: flex;
  justify-content: space-between;

  > div:first-child {
    width: 100%;
    max-width: 40rem;
  }

  > div:last-child {
    width: 100%;
    max-width: 28rem;
  }

  > div > h3 {
    font-size: 1.125rem;
    font-weight: 700;
    color: ${(props) => props.theme['brown-600']};
    margin-bottom: 1rem;
  }
`

export const ConfirmationContainer = styled.div`
  background-color: ${(props) => props.theme['gray-200']};
  border-radius: 6px 44px;
  padding: 2.5rem;

  > button {
    margin-top: 1.5rem;
    width: 100%;
    padding: 0.75rem 0.5rem;
    background-color: ${(props) => props.theme['yellow-500']};
    color: ${(props) => props.theme['white']};
    border-radius: 6px;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 0.875rem;
  }

  > button:hover {
    background-color: ${(props) => props.theme['yellow-600']};
  }
`

export const Values = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  > div {
    font-size: 0.875rem;
    display: flex;
    justify-content: space-between;
  }

  > div.total {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${(props) => props.theme['brown-600']};
  }
`
