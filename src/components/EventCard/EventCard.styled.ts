import styled from 'styled-components'
import { H1, H2, H3, P } from '../../themes/typography'

export const Card = styled.article<{ hasPassed: boolean }>`
  background-color: #ffffff;
  box-shadow: ${props => (props.hasPassed ? '' : '0px 2px 12px 2px rgba(0, 0, 0, 0.25)')};
  border-radius: 1rem;
  padding: 2rem;
  cursor: pointer;

  position: relative;
`

export const Date = styled(H3)<{ hasPassed: boolean }>`
  ${props => (props.hasPassed ? `color: ${props.theme.colors.red}` : '')}
`

export const RedText = styled(H1)`
  color: ${props => props.theme.colors.red};
  position: absolute;
  right: 8rem;
  top: 5rem;
  transform: rotate(-20deg);
`

export const Heading2 = styled(H2)<{ hasPassed: boolean }>`
  ${props => (props.hasPassed ? `color: gray` : '')}
`

export const Heading3 = styled(H3)<{ hasPassed: boolean }>`
  ${props => (props.hasPassed ? `color: gray` : '')}
`

export const Text = styled(P)<{ hasPassed: boolean }>`
  ${props => (props.hasPassed ? `color: gray` : '')}
`

export const ThemesContainer = styled.div`
  display: flex;
  gap: 6px;
  margin: 6px 0;
`
