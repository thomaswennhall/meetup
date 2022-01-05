import React, { FunctionComponent, useState } from 'react'
import { IEvent } from '../../models'
import { H2, H3, P } from '../../themes/typography'
import { StyledModal } from '../Modal/Modal.styled'
import * as S from './EventCard.styled'

import EventModal from '../EventModal'

interface Props {
  event: IEvent
}

const EventCard: FunctionComponent<Props> = ({ event }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }

  const hasPassed: boolean = Date.now() - +event.date  > 0
  
  return (
    <>
      <S.Card hasPassed={hasPassed} onClick={toggleModal} data-test="event-card" data-testid="event-card">
        <S.Heading2 hasPassed={hasPassed} data-test="event-title">{event.title}</S.Heading2>
        <S.Date hasPassed={hasPassed} data-test="event-date">
          {event.date.toLocaleDateString()} {event.time}
        </S.Date>
        <S.Heading3 hasPassed={hasPassed} data-test="event-place">{event.place}</S.Heading3>
        <S.Heading3 hasPassed={hasPassed} data-test="event-attendees">
          spots: {event.attendees}/{event.maxAttendees}
        </S.Heading3>
        <S.Text hasPassed={hasPassed} data-test="event-description">{event.description.substring(0, 90)}...</S.Text>
      </S.Card>
      <StyledModal
        isOpen={modalVisible}
        allowScroll={false}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        data-testid="event-card-modal"
      >
        <EventModal data-testid="dinmamma" eventId={event.id} toggleModal={toggleModal} />
      </StyledModal>
    </>
  )
}

export default EventCard
