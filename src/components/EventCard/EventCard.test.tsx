import { render, screen, fireEvent } from '@testing-library/react'
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import EventCard from '.'
import { Theme } from '../../models'
import theme from '../../themes'

describe('EventCard component', () => {
  const event = {
    id: 'oijf+94jt038f',
    title: 'Julafton',
    date: new Date('2021-12-24'),
    time: '15:00',
    place: 'online',
    maxAttendees: 50,
    attendees: 32,
    themes: [],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus et in lorem gravida rhoncus. Bibendum ut sit in diam lobortis. Enim, aliquam erat sit tincidunt.',
  }

  it('should render without errors', () => {
    shallow(
      <ThemeProvider theme={theme}>
        <EventCard event={event} />
      </ThemeProvider>
    )
  })

  describe('blackbox tests', () => {
    let wrapper: ReactWrapper
    beforeEach(() => {
      wrapper = mount(
        <ThemeProvider theme={theme}>
          <EventCard event={event} />
        </ThemeProvider>
      )
    })

    it('should render correct title for event', () => {
      const title = wrapper.find('[data-test="event-title"]').first()

      expect(title.text()).toBe(event.title)
    })
    it('should render correct date for event', () => {
      const date = wrapper.find('[data-test="event-date"]').first()

      expect(date.text()).toBe(`${event.date.toLocaleDateString()} ${event.time}`)
    })
    it('should render correct place for event', () => {
      const place = wrapper.find('[data-test="event-place"]').first()

      expect(place.text()).toBe(event.place)
    })
    it('should render a shortened version of description for event', () => {
      const desc = wrapper.find('[data-test="event-description"]').first()

      expect(desc.text().length).toBe(93)
    })
    it('should render the number of people who are attending the event', () => {
      const attendees = wrapper.find('[data-test="event-attendees"]').first()

      expect(attendees.text()).toContain(`${event.attendees}/${event.maxAttendees}`)
    })
    it('should NOT render a themeSticker component when event does not have a theme', () => {
      const themeSticker = wrapper.find('[data-testid="theme-sticker"]')
      expect(themeSticker.exists()).toBeFalsy()
    })
    it('should render a themeSticker component when event has a theme', () => {
      const eventWithTheme = {
        id: 'oijf+94jt038f',
        title: 'Julafton',
        date: new Date('2021-12-24'),
        time: '15:00',
        place: 'online',
        maxAttendees: 50,
        attendees: 32,
        themes: [Theme.MUSIC],
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus et in lorem gravida rhoncus. Bibendum ut sit in diam lobortis. Enim, aliquam erat sit tincidunt.',
      }

      const wrapper1 = mount(
        <ThemeProvider theme={theme}>
          <EventCard event={eventWithTheme} />
        </ThemeProvider>
      )
      const themeSticker = wrapper1.find('[data-testid="theme-sticker"]')
      expect(themeSticker.exists()).toBeTruthy()
    })

    it('should have a modal component', () => {
      const modal = wrapper.find('[data-testid="event-card-modal"]').first()

      expect(modal.exists()).toBeTruthy()
    })
    it('should not show event modal initially', () => {
      const eventModal = wrapper.find('[data-testid="event-modal"]').first()
      expect(eventModal.exists()).toBeFalsy()
    })
  })

  describe('Whitebox', () => {
    it('should show event modal on click', async () => {
      render(
        <ThemeProvider theme={theme}>
          <EventCard event={event} />
        </ThemeProvider>
      )

      const card = await screen.findByTestId('event-card')
      fireEvent.click(card)

      const eventModal = screen.findByTestId('event-modal')

      expect(eventModal).toBeDefined()
    })
  })
})
