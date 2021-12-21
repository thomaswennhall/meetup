import { selector } from 'recoil'
import eventsState from '../atoms/events'
import searchStringState from '../atoms/searchString'

export default selector({
  key: 'eventsSelector',
  get: ({ get }) => {
    const searchString = get(searchStringState)
    return get(eventsState).filter(event =>
      event.title.toLowerCase().includes(searchString.toLowerCase())
    )
  },
  set: () => {}
})
