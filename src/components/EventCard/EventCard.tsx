import React, { FunctionComponent } from 'react'
import { IEvent } from '../../models'
import { H2, H3, P } from '../../themes/typography'
import * as S from './EventCard.styled'

interface Props {
  event: IEvent
}

const EventCard: FunctionComponent<Props> = ({ event }) => {
  return (
    <S.Card data-test="event-card" data-testid="event-card">
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
  )
}

export default EventCard
