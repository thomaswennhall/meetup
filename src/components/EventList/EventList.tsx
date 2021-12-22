import React, { FunctionComponent } from 'react'
import { useRecoilState } from 'recoil'
import eventsSelector from '../../Recoil/selectors/eventsSelector'

import * as S from './EventList.styled'
import { H1 } from '../../themes/typography'

import EventCard from '../EventCard'

const EventList: FunctionComponent = () => {
  const [events] = useRecoilState(eventsSelector)

  return (
    <S.Wrapper data-test="event-list">
      <H1>Meetups</H1>
      {events.length > 0 && events.map(event => <EventCard key={event.id} event={event} />)}
    </S.Wrapper>
  )
}

export default EventList
