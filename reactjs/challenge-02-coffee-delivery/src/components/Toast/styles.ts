import styled from "styled-components"

export const ToastContainer = styled.li`
  max-width: 20rem;
  list-style: none;
  position: fixed;
  bottom: 0;
  left: 0;
  margin: 2rem;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme['purple-200']};
  
  > div.title {
    font-family: 'Baloo 2', sans-serif;
    font-weight: 700;
    font-size: 1.375rem;
    line-height: 130%;
    color: ${(props) => props.theme['brown-900']};
    margin-bottom: 0.25rem;
  }
`
