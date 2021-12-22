import { shallow, mount } from 'enzyme'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from 'styled-components'

import mockEvents from '../../models/mockData'
import theme from '../../themes'
import EventList from './'

describe('EventList component', () => {
  it('should render without errors', () => {
    shallow(
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <EventList />
        </RecoilRoot>
      </ThemeProvider>
    )
  })
  describe('Blackbox tests', () => {
    it('should render a list of events', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <EventList />
          </RecoilRoot>
        </ThemeProvider>
      )
      const events = wrapper.find('[data-test="event-card"]')
      expect(events.length).toBe(mockEvents.length * 2)
    })
    it('should sort list of events by date', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <EventList />
          </RecoilRoot>
        </ThemeProvider>
      )
      const dates = wrapper.find('[data-test="event-date"]')
      const firstDate = new Date(dates.at(0).text()).getTime()
      const secondDate = new Date(dates.at(2).text()).getTime()
      const thirdDate = new Date(dates.at(4).text()).getTime()
      const fourthDate = new Date(dates.at(6).text()).getTime()

      expect(firstDate).toBeLessThan(secondDate)
      expect(secondDate).toBeLessThan(thirdDate)
      expect(thirdDate).toBeLessThan(fourthDate)
    })
  })
})
