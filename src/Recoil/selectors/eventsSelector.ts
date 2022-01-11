import { selector } from 'recoil'
import { IEvent } from '../../models'
import eventsState from '../atoms/events'
import searchStringState from '../atoms/searchString'

export default selector({
  key: 'eventsSelector',
  get: ({ get }) => {
    const searchString = get(searchStringState)

    const filteredState = get(eventsState).filter(
      event =>
        event.title.toLowerCase().includes(searchString.toLowerCase()) ||
        [...event.themes].join(' ').includes(searchString.toLowerCase())
    )
    // Dela upp söksträngen i ord och filtrera på varje ord
    // Kolla upp datatypen Set (kombinera flera filtrerade resultat)

    if (searchString.length > 2 && filteredState.length) {
      return sortByFutureFirst(sortByDate(filteredState))
    } else {
      return sortByFutureFirst(sortByDate(get(eventsState)))
    }
  },
  set: () => {},
})

function sortByDate(events: IEvent[]) {
  return [...events].sort((a, b) => +a.date - +b.date)
}

function sortByFutureFirst(events: IEvent[]) {
  const futureEvents = [...events].filter(ev => +ev.date >= Date.now())
  const passedEvents = [...events].filter(ev => +ev.date < Date.now()).reverse()
  return futureEvents.concat(passedEvents)
}
