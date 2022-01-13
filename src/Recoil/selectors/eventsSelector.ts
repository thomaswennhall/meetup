import { selector } from 'recoil'
import { IEvent } from '../../models'
import eventsState from '../atoms/events'
import searchStringState from '../atoms/searchString'

export default selector({
  key: 'eventsSelector',
  get: ({ get }) => {
    const searchString = get(searchStringState)
    const searchWords = searchString.split(' ')

    const filteredState = get(eventsState).filter(
      event =>
        event.title.toLowerCase().includes(searchString.toLowerCase()) ||
        searchWords.every(word => [...event.themes].join(' ').includes(word))
    )

    if (searchString.length > 2) {
      return sortByFutureFirst(sortByDateAndTime(filteredState))
    } else {
      return sortByFutureFirst(sortByDateAndTime(get(eventsState)))
    }
  },
  set: () => {},
})

function getHours(time: string) {
  return time.split(':')[0]
}
function getMinutes(time: string) {
  return time.split(':')[1]
}

export function getActualTime(date: Date, time: string) {
  const actualTime = new Date(date)
  actualTime.setHours(+getHours(time))
  actualTime.setMinutes(+getMinutes(time))
  return actualTime
}

function sortByDateAndTime(events: IEvent[]) {
  return [...events].sort((a, b) => {
    const dateA = getActualTime(a.date, a.time)
    const dateB = getActualTime(b.date, b.time)
    return +dateA - +dateB
  })
}

function sortByFutureFirst(events: IEvent[]) {
  const futureEvents = [...events].filter(ev => +getActualTime(ev.date, ev.time) > Date.now())
  const passedEvents = [...events]
    .filter(ev => +getActualTime(ev.date, ev.time) <= Date.now())
    .reverse()
  return futureEvents.concat(passedEvents)
}
