import React, { FunctionComponent } from 'react'
import { H3 } from '../../themes/typography'
import { Button } from './CtaButton.styled'
interface IProps {
  text: string
  clickHandler: () => void
  testId?: string
  disable?: boolean
}

const CtaButton: FunctionComponent<IProps> = ({
  text,
  clickHandler,
  testId = '',
  disable = false,
}) => {
  return (
    <Button disabled={disable} data-test="cta-button" data-testid={testId} onClick={clickHandler}>
      <H3>{text}</H3>
    </Button>
  )
}

export default CtaButton
