import { atom } from 'recoil'
import mockEvents from '../../models/mockData'

const eventsState = atom({
  key: 'eventsState',
  default: mockEvents
})

export default eventsState
