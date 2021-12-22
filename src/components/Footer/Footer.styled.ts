import styled from 'styled-components'

export const Wrapper = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: ${props => props.theme.colors.orange};
  padding: 1rem;
  display: flex;
  flex-direction: row-reverse;
  min-height: 10%;
`
