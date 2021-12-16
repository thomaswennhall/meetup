import { atom } from 'recoil'
import mockEvents from '../mockData'

const eventsState = atom({
  key: 'eventsState',
  default: mockEvents
})

export default eventsState
