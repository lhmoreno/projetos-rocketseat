import styled from "styled-components"

export const InputNumberContainer = styled.div`
  padding: 0.25rem;
  border-radius: 6px;
  background-color: ${(props) => props.theme['gray-400']};
  color: ${(props) => props.theme['brown-900']};
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  button {
    height: 100%;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;

    svg {
      width: 0.875rem;
      height: 0.875rem;
      color: ${(props) => props.theme['purple-500']};
    }
  }
  
  button:hover {
    svg {
      color: ${(props) => props.theme['purple-700']};
    }
  }
`

export const Location = styled.span`
  height: 2.375rem;
  padding: 0 0.5rem;
  font-size: 0.875rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  background-color: ${(props) => props.theme['purple-100']};
  color: ${(props) => props.theme['purple-800']};

  border-radius: 6px;

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: ${(props) => props.theme['purple-500']};
  }
`
