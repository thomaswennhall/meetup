import React, { FunctionComponent, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import eventsState from '../../Recoil/atoms/events'
import eventsSelector from '../../Recoil/selectors/eventsSelector'

import EventCard from '../EventCard'

const EventList: FunctionComponent = () => {
  const [events, setEvents] = useRecoilState(eventsSelector)

  /* 
  useEffect(() => {
    const eventsInLocalStore = localStorage.getItem('events')
    if (eventsInLocalStore) {
      setEvents(JSON.parse(eventsInLocalStore))
    } else {
      localStorage.setItem('events', JSON.stringify(events))
    }
  }, [])
 */
  return (
    <section data-test="event-list">
      {events.length > 0 && events.map(event => <EventCard key={event.id} event={event} />)}
    </section>
  )
}

export default EventList
