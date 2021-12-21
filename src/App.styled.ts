import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.bg};
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
`
