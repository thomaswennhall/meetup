import React, { useState } from 'react'
import CtaButton from '../CtaButton'
import { Wrapper } from './Footer.styled'
import { StyledModal } from '../Modal/Modal.styled'
import CreateEvent from '../CreateEvent'

const Footer = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }
  return (
    <Wrapper data-testid="footer">
      <CtaButton text="Create Meetup" clickHandler={toggleModal} testId="open_create-button" />
      <StyledModal
        isOpen={modalVisible}
        allowScroll={false}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        data-testid="create-event-modal"
      >
        <CreateEvent />
      </StyledModal>
    </Wrapper>
  )
}

export default Footer
