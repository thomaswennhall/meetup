import React, { FunctionComponent } from 'react'
import { useRecoilState } from 'recoil'
import eventsSelector from '../../Recoil/selectors/eventsSelector'

import * as S from './EventList.styled'
import { H1, H2 } from '../../themes/typography'

import EventCard from '../EventCard'

const EventList: FunctionComponent = () => {
  const [events] = useRecoilState(eventsSelector)

  return (
    <S.Wrapper data-test="event-list">
      {events.length > 0 ? (
        <>
          <H1>Meetups</H1>
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </>
      ) : (
        <H2 data-testid="nothing-found-text">We couldn't find anything matching your search</H2>
      )}
    </S.Wrapper>
  )
}

export default EventList
