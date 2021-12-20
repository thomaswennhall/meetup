import React from 'react'
import { render } from '@testing-library/react'
import { mount } from 'enzyme'
import { RecoilRoot, useRecoilState } from 'recoil'
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
  })
})
