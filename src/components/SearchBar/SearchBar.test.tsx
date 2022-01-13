import { mount, ReactWrapper, shallow } from 'enzyme'
import { fireEvent, render, screen } from '@testing-library/react'

import { RecoilRoot } from 'recoil'
import searchStringState from '../../Recoil/atoms/searchString'
import { RecoilObserver } from '../../Recoil/observers'

import SearchBar from '.'
import { ThemeProvider } from 'styled-components'
import theme from '../../themes'

describe('SearchBar component', () => {
  it('should render without errors', () => {
    shallow(
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <SearchBar />
        </RecoilRoot>
      </ThemeProvider>
    )
  })

  describe('Whitebox', () => {
    let wrapper: ReactWrapper
    beforeEach(() => {
      wrapper = mount(
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <SearchBar />
          </RecoilRoot>
        </ThemeProvider>
      )
    })

    it('should render empty input field initially', () => {
      const input = wrapper.find('[data-test="search-input"]').first()
      expect(input.exists()).toBe(true)
      expect(input.render().val()).toBe('')
    })

    it('should render text in input field on change', () => {
      const testInput = 'hello'

      const input = wrapper.find('[data-test="search-input"]').first()
      expect(input.exists()).toBe(true)

      input.simulate('change', { target: { value: testInput } })
      expect(input.render().val()).toBe(testInput)
    })

    it('should change searchString in RecoilState on change', () => {
      const onChange = jest.fn()

      render(
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <RecoilObserver node={searchStringState} onChange={onChange} />
            <SearchBar />
          </RecoilRoot>
        </ThemeProvider>
      )

      const testInput = 'hello'
      const input = screen.getByTestId('search-input')
      fireEvent.change(input, { target: { value: testInput } })

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenCalledWith('') // Initial state on render.
      expect(onChange).toHaveBeenCalledWith(testInput) // New value on change.
    })
  })
})
