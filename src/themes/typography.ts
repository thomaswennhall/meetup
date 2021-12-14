import styled, { css } from 'styled-components'
import theme from './'

const baseHeading = css`
  font-family: 'Kreon';
  color: ${theme.colors.text.dark};
`

export const H1 = styled.h1`
  ${baseHeading}
`

export const H2 = styled.h2`
  ${baseHeading}
`

export const H3 = styled.h3`
  ${baseHeading}
  font-size: 1.2rem;
`

const baseText = css`
  font-family: 'Heebo';
  color: ${theme.colors.text.dark};
`

export const P = styled.p`
  ${baseText}
  font-weight: 300;
`
