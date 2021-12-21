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
  })
})
