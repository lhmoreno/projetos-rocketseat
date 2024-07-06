import styled from "styled-components"

export const PageSuccessContainer = styled.div`
  margin-top: 5rem;

  div > h2 {
    font-size: 2rem;
    color: ${(props) => props.theme['orange-600']};
  }

  div > span {
    color: ${(props) => props.theme['brown-600']};
    font-size: 1.25rem;
  }
`

export const DeliveryContainer = styled.div`
  margin-top: 2.5rem;
  display: flex;
  justify-content: space-between;

  img {
    width: 30.75rem;
  }
`

export const Infos = styled.div`
  width: 100%;
  max-width: 30.75rem;
  border: 1px solid transparent;
  background: ${(props) => `linear-gradient(${props.theme['gray-100']}, ${props.theme['gray-100']}) padding-box, linear-gradient(to right bottom, ${props.theme['yellow-500']}, ${props.theme['purple-500']}) border-box`};
  border-radius: 6px 36px;
  padding: 0 2.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;

  > div {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    p {
      line-height: 160%;
    }
  }

  .purple {
    background-color: ${(props) => props.theme['purple-500']};
  }

  .yellow {
    background-color: ${(props) => props.theme['yellow-500']};
  }

  .orange {
    background-color: ${(props) => props.theme['orange-600']};
  }
`

export const InfoIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme['white']};

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`
