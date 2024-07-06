import styled from "styled-components"

export const CoffeeContainer = styled.div`
  padding: 1.25rem;
  border-radius: 6px 36px;
  background-color: ${(props) => props.theme['gray-200']};

  display: flex;
  flex-direction: column;
  align-items: center;

  > img {
    margin-top: -2.5rem;
  }

  > h3 {
    margin-top: 1rem;
    font-size: 1.25rem;
    font-weight: 700;
    color: ${(props) => props.theme['brown-600']};
  }
  
  > p {
    color: ${(props) => props.theme['brown-200']};
    font-size: 0.875rem;
    line-height: 130%;
    text-align: center;
  }

  > footer {
    margin-top: 2rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > span {
      font-size: 0.875rem;

      strong {
        font-size: 1.5rem;
      }
    }

    > div {
      display: flex;
      gap: 0.5rem;
    }
  }
`

export const Tags = styled.div`
  margin-top: 0.75rem;
  display: flex;
  gap: 0.2rem;
  flex-wrap: wrap;

  span {
    text-transform: uppercase;
    font-size: 0.625rem;
    font-weight: 700;
    padding: 0.25rem 0.5rem;
    border-radius: 100px;
    color: ${(props) => props.theme['orange-600']};
    background-color: ${(props) => props.theme['yellow-100']};
  }
`

export const CartButton = styled.button`
  width: 2.375rem;
  height: 2.375rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme['purple-700']};
  color: ${(props) => props.theme['white']};

  border-radius: 6px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme['purple-800']};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`
