import React, { FunctionComponent } from 'react'
import { IEvent } from '../../models'
import { Container } from './EventModal.styled'
import { H1, H2, H3, P } from '../../themes/typography'

interface Props {
  event: IEvent
  toggleModal: (toggle: boolean) => void
}

const EventModal: FunctionComponent<Props> = ({ event, toggleModal }) => {
  return (
    <Container data-testid="event-modal">
      <H1 data-testid="event-modal-title">{event.title}</H1>
      <H2 data-testid="event-modal-date">
        {event.date.toLocaleDateString()} {event.time}
      </H2>
      <H3 data-testid="event-modal-place">{event.place}</H3>
      <H3 data-testid="event-modal-attendees">
        {event.attendees}/{event.maxAttendees}
      </H3>
      <P data-testid="event-modal-description">{event.description}</P>
    </Container>
  )
}

export default EventModal
