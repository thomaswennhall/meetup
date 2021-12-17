import React, { FunctionComponent } from 'react'
import { IEvent } from '../../Recoil/mockData'
import { H2, H3, P } from '../../themes/typography'

interface Props {
  event: IEvent
}

const EventCard: FunctionComponent<Props> = ({ event }) => {
  return (
    <article data-test="event-card">
      <H2 data-test="event-title">{event.title}</H2>
      <H3 data-test="event-time">{event.time.toLocaleDateString('SE')}</H3>
      <H3 data-test="event-place">{event.place}</H3>
      <P data-test="event-description">{event.description.substring(0, 50)}</P>
    </article>
  )
}

export default EventCard
