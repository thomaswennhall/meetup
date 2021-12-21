import React from 'react'
import CtaButton from '../CtaButton'

const Footer = () => {
  const openCreateModal = () => {}

  return (
    <footer>
      <CtaButton text="Create Meetup" clickHandler={openCreateModal} />
    </footer>
  )
}

export default Footer
