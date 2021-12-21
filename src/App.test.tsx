import { render } from '@testing-library/react'
import { mount } from 'enzyme'
import { RecoilRoot } from 'recoil'
import mockEvents from './models/mockData'

import App from './App'

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

    it('should render event list with title matching search input on submit', () => {
      const wrapper = mount(
        <RecoilRoot>
          <App />
        </RecoilRoot>
      )
      const eventCards = wrapper.find('[data-test="event-card"]')
      expect(eventCards.length).toBe(mockEvents.length)

      const testInput = mockEvents[0].title.toLowerCase()

      const input = wrapper.find('[data-test="search-input"]')
      input.simulate('change', { target: { value: testInput } })

      const button = wrapper.find('[data-test="search-button"]')
      button.simulate('click')

      expect(eventCards.length).toBe(1)
    })
  })
})
