import React, { FunctionComponent, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import eventsState from '../../Recoil/atoms/events'

const EventList: FunctionComponent = () => {
  const [events, setEvents] = useRecoilState(eventsState)

  useEffect(() => {
    const eventsInLocalStore = localStorage.getItem('events')
    if (eventsInLocalStore) {
      setEvents(JSON.parse(eventsInLocalStore))
    } else {
      localStorage.setItem('events', JSON.stringify(events))
    }
  }, [])

  return (
    <section>
      <ul>{events && events.map(event => <li key={event.id}>{event.title}</li>)}</ul>
    </section>
  )
}

export default EventList
