import { selector } from 'recoil'
import eventsState from '../atoms/events'

export default selector({
  key: 'eventsSelector',
  get: ({ get }) => {
    return get(eventsState)
  }
})
