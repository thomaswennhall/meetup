import React, { FunctionComponent } from 'react'

interface IProps {
  text: string
  clickHandler: () => void
}

const CtaButton: FunctionComponent<IProps> = ({ text, clickHandler }) => {
  return (
    <button data-testid="cta-button" onClick={clickHandler}>
      {text}
    </button>
  )
}

export default CtaButton
