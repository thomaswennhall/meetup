import React, { FunctionComponent } from 'react'
import { H3 } from '../../themes/typography'
import { Button } from './CtaButton.styled'
interface IProps {
  text: string
  clickHandler: () => void
}

const CtaButton: FunctionComponent<IProps> = ({ text, clickHandler }) => {
  return (
    <Button data-testid="cta-button" onClick={clickHandler}>
      <H3>{text}</H3>
    </Button>
  )
}

export default CtaButton
