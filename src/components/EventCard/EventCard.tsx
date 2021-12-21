import React, { FunctionComponent } from 'react'
import { IEvent } from '../../models'
import { H2, H3, P } from '../../themes/typography'

interface Props {
  event: IEvent
}

const EventCard: FunctionComponent<Props> = ({ event }) => {
  return (
    <article data-test="event-card" data-testid="event-card">
      <H2 data-test="event-title">{event.title}</H2>
      <H3 data-test="event-date">
        {event.date} {event.time}
      </H3>
      <H3 data-test="event-place">{event.place}</H3>
      <P data-test="event-description">{event.description.substring(0, 50)}</P>
    </article>
  )
}

export default EventCard
