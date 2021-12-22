import { selector } from 'recoil'
import { IEvent } from '../../models'
import eventsState from '../atoms/events'
import searchStringState from '../atoms/searchString'

export default selector({
  key: 'eventsSelector',
  get: ({ get }) => {
    const searchString = get(searchStringState)

    const filteredState = get(eventsState).filter(event =>
      event.title.toLowerCase().includes(searchString.toLowerCase())
    )

    if (searchString.length > 2 && filteredState.length) {
      return sortByDate(filteredState)
    } else {
      return sortByDate(get(eventsState))
    }
  },
  set: () => {}
})

const sortByDate = (events: IEvent[]) => {
  return [...events].sort((a, b) => a.date.getSeconds() - b.date.getSeconds())
}
