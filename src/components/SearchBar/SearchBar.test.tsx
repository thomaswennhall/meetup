import { mount, ReactWrapper, shallow } from 'enzyme'
import { fireEvent, render, screen } from '@testing-library/react'

import { RecoilRoot } from 'recoil'
import searchStringState from '../../Recoil/atoms/searchString'
import { RecoilObserver } from '../../Recoil/observers'

import SearchBar from '.'

describe('SearchBar component', () => {
  it('should render without errors', () => {
    shallow(
      <RecoilRoot>
        <SearchBar />
      </RecoilRoot>
    )
  })
  describe('Blackbox tests', () => {
    it('should render a button', () => {
      const wrapper = mount(
        <RecoilRoot>
          <SearchBar />
        </RecoilRoot>
      )
      const button = wrapper.find('[data-test="search-button"]')
      expect(button.exists()).toBe(true)
    })
  })

  describe('Whitebox tests', () => {
    let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>
    beforeEach(() => {
      wrapper = mount(
        <RecoilRoot>
          <SearchBar />
        </RecoilRoot>
      )
    })

    it('should render empty input field initially', () => {
      const input = wrapper.find('[data-test="search-input"]')
      expect(input.exists()).toBe(true)
      expect(input.render().val()).toBe('')
    })

    it('should render text in input field on change', () => {
      const testInput = 'hello'

      const input = wrapper.find('[data-test="search-input"]')
      expect(input.exists()).toBe(true)

      input.simulate('change', { target: { value: testInput } })
      expect(input.render().val()).toBe(testInput)
    })

    it('should change searchString in RecoilState on submit', async () => {
      const onChange = jest.fn()

      render(
        <RecoilRoot>
          <RecoilObserver node={searchStringState} onChange={onChange} />
          <SearchBar />
        </RecoilRoot>
      )

      const testInput = 'hello'
      const input = await screen.findByTestId('search-input')
      fireEvent.change(input, { target: { value: testInput } })

      const button = await screen.findByTestId('search-button')
      fireEvent.click(button)

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenCalledWith('') // Initial state on render.
      expect(onChange).toHaveBeenCalledWith(testInput) // New value on change.
    })
  })
})
