import React, { FunctionComponent } from 'react'
import { IEvent } from '../../models'
import { Container } from './EventModal.styled'
import { H1, H2, H3, P } from '../../themes/typography'
import CtaButton from '../CtaButton'
import { useRecoilState } from 'recoil'
import eventsState from '../../Recoil/atoms/events'

interface Props {
  eventId: string
  toggleModal: (toggle: boolean) => void
}

const EventModal: FunctionComponent<Props> = ({ eventId, toggleModal }) => {
  const [events, setEvents] = useRecoilState(eventsState)

  const event = { ...[...events].find(ev => ev.id === eventId) } as IEvent

  const attend = () => {
    if (event.attendees < event.maxAttendees) {
      event!.attendees = event!.attendees! + 1
      const updatedEvents = [...events].map(ev => (ev.id === event.id ? event : ev))
      setEvents([...updatedEvents])
    }
  }

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
      <CtaButton testId="event-modal-button" text="Attend" clickHandler={attend} />
      <section data-testid="event-modal-comments">
        <H2>Comments</H2>
        {event.comments &&
          event.comments.map(comment => (
            <P key={comment.id} data-testid="event-comment">
              {comment.text}
            </P>
          ))}
      </section>
    </Container>
  )
}

export default EventModal
