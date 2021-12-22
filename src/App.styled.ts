import styled from 'styled-components'

export const Wrapper = styled.main`
  background-color: ${props => props.theme.colors.bg};
  min-height: 100vh;
  padding-bottom: 5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
`
