import React, { FunctionComponent } from 'react'
import { IEvent } from '../../Recoil/mockData'
import { H2, H3 } from '../../themes/typography'

interface Props {
  event: IEvent
}

const EventCard: FunctionComponent<Props> = ({ event }) => {
  return (
    <article>
      <H2 data-test="event-title">{event.title}</H2>
      <H3 data-test="event-time">{event.time.toString()}</H3>
    </article>
  )
}

export default EventCard
