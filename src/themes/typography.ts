import styled, { css } from 'styled-components'
import theme from './'

const baseHeading = css`
  font-family: 'Kreon';
  color: ${theme.colors.text.dark};
`

export const H1 = styled.h1`
  ${baseHeading}
  font-size: 1.8rem;
`

export const H2 = styled.h2`
  ${baseHeading}
  font-size: 1.4rem;
`

export const H3 = styled.h3`
  ${baseHeading}
  font-size: 1.2rem;
`

export const Label = styled.label`
  ${baseHeading}
  font-weight: 400;
`

export const baseText = css`
  font-family: 'Heebo';
`

export const P = styled.p<{ light?: boolean }>`
  ${baseText}
  color: ${props => (props.light ? `${theme.colors.text.light}` : `${theme.colors.text.dark}`)};
  font-weight: 300;
`
