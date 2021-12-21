import { atom } from 'recoil'

const searchStringState = atom({
  key: 'searchStringState',
  default: ''
})

export default searchStringState
