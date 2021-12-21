import { selector } from 'recoil'
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
      return filteredState
    } else {
      return get(eventsState)
    }
  },
  set: () => {}
})
