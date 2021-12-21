import { fireEvent, render, screen } from '@testing-library/react'
import { mount } from 'enzyme'
import { RecoilRoot } from 'recoil'
import mockEvents from './models/mockData'

import App from './App'
import { RecoilObserver } from './Recoil/observers'
import searchStringState from './Recoil/atoms/searchString'

describe('App', () => {
  it('should render without errors', () => {
    render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    )
  })

  describe('Integration tests', () => {
    it('should render event list component', () => {
      const wrapper = mount(
        <RecoilRoot>
          <App />
        </RecoilRoot>
      )

      const eventList = wrapper.find('[data-test="event-list"]')
      expect(eventList.length).toBe(1)
    })

    it('should render Header component', () => {
      const wrapper = mount(
        <RecoilRoot>
          <App />
        </RecoilRoot>
      )

      const header = wrapper.find('[data-test="header"]')
      expect(header.exists()).toBeTruthy()
    })

    it('should render event list with title matching search input on submit', async () => {
      const onChange = jest.fn()

      render(
        <RecoilRoot>
          <RecoilObserver node={searchStringState} onChange={onChange} />
          <App />
        </RecoilRoot>
      )

      let eventCards = await screen.findAllByTestId('event-card')
      expect(eventCards.length).toBe(mockEvents.length)

      const testInput = mockEvents[0].title.toLowerCase()

      const input = await screen.findByTestId('search-input')
      fireEvent.change(input, { target: { value: testInput } })

      eventCards = await screen.findAllByTestId('event-card')

      expect(eventCards.length).toBe(1)
    })
    it('should NOT filter event list if search input is less than 3 characters long', async () => {
      const onChange = jest.fn()

      render(
        <RecoilRoot>
          <RecoilObserver node={searchStringState} onChange={onChange} />
          <App />
        </RecoilRoot>
      )

      let eventCards = await screen.findAllByTestId('event-card')
      expect(eventCards.length).toBe(mockEvents.length)

      const testInput = 'ho'
      const input = await screen.findByTestId('search-input')
      fireEvent.change(input, { target: { value: testInput } })

      eventCards = await screen.findAllByTestId('event-card')

      expect(eventCards.length).toBe(mockEvents.length)
    })
  })
})
