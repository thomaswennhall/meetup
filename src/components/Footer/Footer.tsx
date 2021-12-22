import React from 'react'
import CtaButton from '../CtaButton'
import { Wrapper } from './Footer.styled'

const Footer = () => {
  const openCreateModal = () => {}

  return (
    <Wrapper data-testid="footer">
      <CtaButton text="Create Meetup" clickHandler={openCreateModal} />
    </Wrapper>
  )
}

export default Footer
