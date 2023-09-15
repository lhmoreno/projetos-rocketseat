import styled from "styled-components"

export const Intro = styled.div`
  padding: 5.75rem 0;
  display: flex;
  justify-content: space-between;
  justify-content: center;
  gap: 3.5rem;

  img {
    width: 29.75rem;
    object-fit: contain;
  }
`

export const IntroData = styled.div`
  h1 {
    margin-bottom: 1rem;
    font-size: 3rem;
    color: ${(props) => props.theme['brown-900']};
  }

  span {
    font-size: 1.25rem;
    color: ${(props) => props.theme['brown-600']};
    line-height: 130%;
  }
`

export const IntroDetails = styled.div`
  margin-top: 4rem;
  display: grid;
  grid-template-columns: 14.75rem 1fr;
  gap: 1.25rem 2.5rem;

  > div {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .brown {
    background-color: ${(props) => props.theme['brown-400']};
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
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme['white']};

  svg {
    width: 1.125rem;
    height: 1.125rem;
  }
`

export const Coffees = styled.div`
  h2 {
    margin-top: 2rem;
    font-size: 2rem;
    color: ${(props) => props.theme['brown-600']};
  }

  > div {
    margin-top: 3.5rem;
    padding-bottom: 9.75rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2.5rem 2rem;
    flex-wrap: wrap;
  }
`
