import styled from 'styled-components'
import { H2 } from '../../themes/typography'

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
`

export const Rating = styled(H2)`
color: ${props => props.theme.colors.yellow};
`
