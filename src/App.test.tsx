import { fireEvent, render, screen } from '@testing-library/react'
import { mount, ReactWrapper } from 'enzyme'
import { RecoilRoot } from 'recoil'
import mockEvents from './models/mockData'

import App from './App'
import { RecoilObserver } from './Recoil/observers'
import searchStringState from './Recoil/atoms/searchString'
import { ThemeProvider } from 'styled-components'
import theme from './themes'

describe('App', () => {
  it('should render without errors', () => {
    render(
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </ThemeProvider>
    )
  })

  describe('Integration tests', () => {
    let wrapper: ReactWrapper
    beforeEach(() => {
      wrapper = mount(
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <App />
          </RecoilRoot>
        </ThemeProvider>
      )
    })

    it('should render event list component', () => {
      const eventList = wrapper.find('[data-test="event-list"]')
      expect(eventList.exists()).toBeTruthy()
    })

    it('should render Header component', () => {
      const header = wrapper.find('[data-test="header"]')
      expect(header.exists()).toBeTruthy()
    })

    it('should render Footer component', () => {
      const footer = wrapper.find('[data-testid="footer"]')
      expect(footer.exists()).toBeTruthy()
    })

    it('should NOT show create event modal initially', () => {
      const form = wrapper.find('[data-testid="create_event-form"]')
      expect(form.exists()).toBeFalsy()
    })
    it('should show create event modal on click', () => {
      const button = wrapper.find('[data-testid="open_create-button"]').first()
      button.simulate('click')
      const form = wrapper.find('[data-testid="create_event-form"]').first()
      expect(form.exists()).toBeTruthy()
    })

    describe('Searching & filtering event list', () => {
      beforeEach(() => {
        render(
          <ThemeProvider theme={theme}>
            <RecoilRoot>
              <App />
            </RecoilRoot>
          </ThemeProvider>
        )
      })

      it('should render event list containing all events initially', () => {
        const eventCards = screen.getAllByTestId('event-card')
        expect(eventCards.length).toBe(mockEvents.length)
      })

      it('should render event list with title matching search input on submit', () => {
        const testInput = mockEvents[0].title.toLowerCase()

        const input = screen.getByTestId('search-input')
        fireEvent.change(input, { target: { value: testInput } })

        const eventCards = screen.getAllByTestId('event-card')

        expect(eventCards.length).toBe(1)
      })
      it('should NOT filter event list if search input is less than 3 characters long', () => {
        const testInput = 'ho'
        const input = screen.getByTestId('search-input')
        fireEvent.change(input, { target: { value: testInput } })

        const eventCards = screen.getAllByTestId('event-card')

        expect(eventCards.length).toBe(mockEvents.length)
      })
      it('should not render any events if search input results in no matches', () => {
        const testInput = 'hijfoiej'
        const input = screen.getByTestId('search-input')
        fireEvent.change(input, { target: { value: testInput } })

        const eventCards = screen.queryByTestId('event-card')
        expect(eventCards).toBeNull()
      })
      it('should render a "nothing found" text if search input results in no matches', () => {
        const testInput = 'hijfoiej'
        const input = screen.getByTestId('search-input')
        fireEvent.change(input, { target: { value: testInput } })

        const nothingFoundText = screen.getByTestId('nothing-found-text')
        expect(nothingFoundText).toBeInTheDocument()
      })

      it('should render event list with theme matching search input on change', () => {
        const testInput = 'holiday'

        const input = screen.getByTestId('search-input')
        fireEvent.change(input, { target: { value: testInput } })

        const eventCards = screen.getAllByTestId('event-card')

        expect(eventCards.length).toBe(3)
      })

      it('should render event list with theme matching search input on change', () => {
        const testInput = 'holiday learning'

        const input = screen.getByTestId('search-input')
        fireEvent.change(input, { target: { value: testInput } })

        const eventCards = screen.getAllByTestId('event-card')

        expect(eventCards.length).toBe(2)
      })
    })
  })
})
