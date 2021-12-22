import React, { FunctionComponent } from 'react'
import { H3 } from '../../themes/typography'
import { Button } from './CtaButton.styled'
interface IProps {
  text: string
  clickHandler: () => void
  testId?: string
}

const CtaButton: FunctionComponent<IProps> = ({ text, clickHandler, testId = '' }) => {
  return (
    <Button data-test="cta-button" data-testid={testId} onClick={clickHandler}>
      <H3>{text}</H3>
    </Button>
  )
}

export default CtaButton
