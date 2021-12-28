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

  return (
    <>
      <S.Card onClick={toggleModal} data-test="event-card" data-testid="event-card">
        <H2 data-test="event-title">{event.title}</H2>
        <H3 data-test="event-date">
          {event.date.toLocaleDateString()} {event.time}
        </H3>
        <H3 data-test="event-place">{event.place}</H3>
        <H3 data-test="event-attendees">
          spots: {event.attendees}/{event.maxAttendees}
        </H3>
        <P data-test="event-description">{event.description.substring(0, 90)}...</P>
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
