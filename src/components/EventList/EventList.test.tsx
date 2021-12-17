import { shallow, mount } from 'enzyme'
import { RecoilRoot } from 'recoil'

import mockData from '../../Recoil/mockData'
import EventList from './'

describe('EventList component', () => {
  it('should render without errors', () => {
    shallow(
      <RecoilRoot>
        <EventList />
      </RecoilRoot>
    )
  })
  describe('Blackbox tests', () => {
    it('should render a list of events', () => {
      const wrapper = mount(
        <RecoilRoot>
          <EventList />
        </RecoilRoot>
      )
      const events = wrapper.find('[data-test="event-card"]')
      expect(events.length).toBe(mockData.length)
    })
  })
})
