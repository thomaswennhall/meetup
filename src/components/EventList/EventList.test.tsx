import { shallow, mount } from 'enzyme'
import EventList from './'
import { RecoilRoot } from 'recoil'

describe('EventList component', () => {
  it('should render without errors', () => {
    shallow(
      <RecoilRoot>
        <EventList />
      </RecoilRoot>
    )
  })
  describe('whitebox tests', () => {
    it('should render a list of events', () => {
      const wrapper = mount(
        <RecoilRoot>
          <EventList />
        </RecoilRoot>
      )
      const li = wrapper.find('li')
      expect(li.length).toBe(1)
    })
  })
})
