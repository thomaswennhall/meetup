import styled from 'styled-components'

export const Button = styled.button`
  outline: none;
  border: none;
  background-color: white;
  box-shadow: 0px 2px 12px 2px rgba(0, 0, 0, 0.25);
  border-radius: 5rem;
  padding: 1rem 2rem;
  margin: 0.3rem 0;
  cursor: pointer;

  align-self: flex-end;

  &:active {
    transform: scale(0.9);
    box-shadow: 4px 2px 16px 4px rgba(0, 0, 0, 0.25);
  }
`
