import styled from "styled-components"
import * as RadioGroup from "@radix-ui/react-radio-group"

const Fieldset = styled.fieldset`
  border: none;
  padding: 2.5rem;
  background-color: ${(props) => props.theme['gray-200']};
  border-radius: 6px;

  legend {
    float: left;
    width: 100%;
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  legend svg {
    width: 1.375rem;
    height: 1.375rem;
  }

  legend div p:first-child {
    color: ${(props) => props.theme['brown-600']};
  } 
  
  legend div p:last-child {
    margin-top: 0.125rem;
    font-size: 0.875rem;
  } 
`

export const FieldsetUserData = styled(Fieldset)`
  legend svg {
    color: ${(props) => props.theme['orange-600']};
  }

  > div {
    float: left;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  > div input {
    width: 100%;
  }

  > div input[name='cep'] {
    max-width: 12.5rem;
  }

  > div input[name='number'] {
    max-width: 12.5rem;
  }

  > div input[name='complement'] {
    max-width: calc(100% - 12.5rem - 1rem);
  }

  > div input[name='district'] {
    max-width: 12.5rem;
  }

  > div input[name='city'] {
    max-width: 17.25rem;
  }

  > div input[name='uf'] {
    max-width: calc(100% - 12.5rem - 17.25rem - 2rem);
    text-transform: uppercase;
  }
`

export const FieldsetPayment = styled(Fieldset)`
  margin-top: 0.75rem;

  svg {
    color: ${(props) => props.theme['purple-500']};
  }
`

export const PaymentType = styled(RadioGroup.Root)`
  width: 100%;
  float: left;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
`

export const PaymentTypeButton = styled(RadioGroup.Item)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  text-transform: uppercase;
  font-size: 0.75rem;
  border-radius: 6px;
  background-color: ${(props) => props.theme['gray-400']};
  transition: background-color 0.3s;

  &:focus {
    box-shadow: none;
  }

  &[data-state='unchecked']:hover {
    background-color: ${(props) => props.theme['gray-500']};
  }

  &[data-state='checked'] {
    border-width: 1px;
    border-style: solid;
    border-color: ${(props) => props.theme['purple-500']};
    background-color: ${(props) => props.theme['purple-100']};
  }

  svg {
    width: 1.125rem;
    height: 1.125rem;
  }
`
