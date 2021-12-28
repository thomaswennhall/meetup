import { fireEvent, render, screen } from '@testing-library/react'
import { mount } from 'enzyme'
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
    it('should render event list component', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <App />
          </RecoilRoot>
        </ThemeProvider>
      )

      const eventList = wrapper.find('[data-test="event-list"]')
      expect(eventList.exists()).toBeTruthy()
    })

    it('should render Header component', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <App />
          </RecoilRoot>
        </ThemeProvider>
      )

      const header = wrapper.find('[data-test="header"]')
      expect(header.exists()).toBeTruthy()
    })

    it('should render Footer component', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <App />
          </RecoilRoot>
        </ThemeProvider>
      )

      const footer = wrapper.find('[data-testid="footer"]')
      expect(footer.exists()).toBeTruthy()
    })

    it('should render event list with title matching search input on submit', async () => {
      const onChange = jest.fn()

      render(
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <RecoilObserver node={searchStringState} onChange={onChange} />
            <App />
          </RecoilRoot>
        </ThemeProvider>
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
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <RecoilObserver node={searchStringState} onChange={onChange} />
            <App />
          </RecoilRoot>
        </ThemeProvider>
      )

      let eventCards = await screen.findAllByTestId('event-card')
      expect(eventCards.length).toBe(mockEvents.length)

      const testInput = 'ho'
      const input = await screen.findByTestId('search-input')
      fireEvent.change(input, { target: { value: testInput } })

      eventCards = await screen.findAllByTestId('event-card')

      expect(eventCards.length).toBe(mockEvents.length)
    })
    it('should NOT filter event list if search input renders no matches', async () => {
      const onChange = jest.fn()

      render(
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <RecoilObserver node={searchStringState} onChange={onChange} />
            <App />
          </RecoilRoot>
        </ThemeProvider>
      )

      let eventCards = await screen.findAllByTestId('event-card')
      expect(eventCards.length).toBe(mockEvents.length)

      const testInput = 'ho ho ho'
      const input = await screen.findByTestId('search-input')
      fireEvent.change(input, { target: { value: testInput } })

      eventCards = await screen.findAllByTestId('event-card')

      expect(eventCards.length).toBe(mockEvents.length)
    })
    it('should NOT show create event modal initially', () => {
      render(
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <App />
          </RecoilRoot>
        </ThemeProvider>
      )
      const form = screen.queryByTestId('create_event-form')
      expect(form).not.toBeInTheDocument()
    })
    it('should show create event modal on click', async () => {
      render(
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <App />
          </RecoilRoot>
        </ThemeProvider>
      )
      const button = await screen.findByTestId('open_create-button')
      fireEvent.click(button)
      const form = await screen.findByTestId('create_event-form')
      expect(form).toBeInTheDocument()
    })
  })
})
