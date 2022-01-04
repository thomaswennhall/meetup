import { shallow, mount, ReactWrapper } from 'enzyme'
import { render, fireEvent, screen } from '@testing-library/react'
import EventModal from '.'
import { RecoilRoot } from 'recoil'
import { RecoilObserver } from '../../Recoil/observers'
import eventsState from '../../Recoil/atoms/events'
import mockEvents from '../../models/mockData'
import { ThemeProvider } from 'styled-components'
import theme from '../../themes'

describe('EventModal component', () => {
  const event = mockEvents[0]

  const toggleModal = jest.fn()

  it('should render without errors', () => {
    shallow(
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <EventModal eventId={event.id} toggleModal={toggleModal} />
        </RecoilRoot>
      </ThemeProvider>
    )
  })

  describe('Blackbox', () => {
    let wrapper: ReactWrapper

    beforeEach(() => {
      wrapper = mount(
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <EventModal eventId={event.id} toggleModal={toggleModal} />
          </RecoilRoot>
        </ThemeProvider>
      )
    })

    it('should render correct title for event', () => {
      const title = wrapper.find('[data-testid="event-modal-title"]').first()
      expect(title.text()).toBe(event.title)
    })

    it('should render correct date for event', () => {
      const date = wrapper.find('[data-testid="event-modal-date"]').first()
      expect(date.text()).toBe(`${event.date.toLocaleDateString()} ${event.time}`)
    })

    it('should render correct place for event', () => {
      const place = wrapper.find('[data-testid="event-modal-place"]').first()
      expect(place.text()).toBe(event.place)
    })

    it('should render description for event', () => {
      const desc = wrapper.find('[data-testid="event-modal-description"]').first()
      expect(desc.text()).toBe(event.description)
    })

    it('should render the number of people who are attending the event', () => {
      const attendees = wrapper.find('[data-testid="event-modal-attendees"]').first()
      expect(attendees.text()).toContain(`${event.attendees}/${event.maxAttendees}`)
    })

    it('should have a comments section', () => {
      const comments = wrapper.find('[data-testid="comments-section"]').first()
      expect(comments.exists()).toBeTruthy()
      expect(comments.text()).toContain('Comments')
    })

    it('should show a rating if event contains one', () => {
      const rating = wrapper.find('[data-testid="event-modal-rating"]').first()
      expect(rating.exists()).toBeTruthy()
      expect(rating.text()).toContain(event.rating![0])
    })

    it('should NOT show a rating if event does not contains one', () => {
      const eventNoRating = mockEvents[2]
      const wrapper1 = mount(
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <EventModal eventId={eventNoRating.id} toggleModal={toggleModal} />
          </RecoilRoot>
        </ThemeProvider>
      )
      const rating = wrapper1.find('[data-testid="event-modal-rating"]').first()
      expect(rating.exists()).toBeTruthy()
      expect(rating.text()).toContain('no rating yet')
    })

    it('should have an input for rating the event', () => {
      const ratingInput = wrapper.find('[data-testid="rating-input"]').first()
      expect(ratingInput.exists()).toBeTruthy()
    })
  })

  describe('Whitebox', () => {
    beforeEach(() => {
      const onChange = jest.fn()
      render(
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <RecoilObserver node={eventsState} onChange={onChange} />
            <EventModal eventId={event.id} toggleModal={toggleModal} />
          </RecoilRoot>
        </ThemeProvider>
      )
    })

    it('should have a button', async () => {
      const attendButton = await screen.findByTestId('event-modal-button')
      expect(attendButton).toBeInTheDocument()
    })

    it('should update attendees on click', async () => {
      let attendeesEl = await screen.findByTestId('event-modal-attendees')
      expect(attendeesEl).toHaveTextContent(`${event.attendees}/${event.maxAttendees}`)

      const button = await screen.findByTestId('event-modal-button')
      fireEvent.click(button)

      attendeesEl = await screen.findByTestId('event-modal-attendees')
      expect(attendeesEl).toHaveTextContent(`${event.attendees + 1}/${event.maxAttendees}`)
    })

    it('should not update events attendees if attendance is full', async () => {
      let attendeesEl = await screen.findByTestId('event-modal-attendees')
      expect(attendeesEl).toHaveTextContent(`${event.attendees}/${event.maxAttendees}`)

      const button = await screen.findByTestId('event-modal-button')

      for (let i = event.attendees; i < event.maxAttendees; i++) {
        fireEvent.click(button)
      }

      attendeesEl = await screen.findByTestId('event-modal-attendees')
      expect(attendeesEl).toHaveTextContent(`${event.maxAttendees}/${event.maxAttendees}`)

      fireEvent.click(button)

      attendeesEl = await screen.findByTestId('event-modal-attendees')
      expect(attendeesEl).toHaveTextContent(`${event.maxAttendees}/${event.maxAttendees}`)
    })

    it('should update event rating on change', async () => {
      let rating = await screen.findAllByTestId('event-modal-rating')
      expect(rating[0]).toHaveTextContent(`${event.rating![0]}`)

      const testRating = 3
      const ratingInput = await screen.findByTestId('rating-input')
      fireEvent.change(ratingInput, { target: { value: testRating }})

      rating = await screen.findAllByTestId('event-modal-rating')

      const newRating = (event.rating![0] * event.rating![1]  + testRating) / (event.rating![1] + 1)
      expect(rating[0]).toHaveTextContent(`${newRating}`)
    })
  })

  describe('other tests', () => {
    it('should create event rating on change if event does not have a rating yet', async () => {
      const onChange = jest.fn()
      const eventNoRating = mockEvents[2]

      render(
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <RecoilObserver node={eventsState} onChange={onChange} />
            <EventModal eventId={eventNoRating.id} toggleModal={toggleModal} />
          </RecoilRoot>
        </ThemeProvider>
      )

      let rating = await screen.findAllByTestId('event-modal-rating')
      expect(rating[0]).toHaveTextContent('no rating yet')

      const testRating = 3
      const ratingInput = await screen.findByTestId('rating-input')
      fireEvent.change(ratingInput, { target: { value: testRating }})

      rating = await screen.findAllByTestId('event-modal-rating')
      expect(rating[0]).toHaveTextContent(`${testRating}`)
    })

    it('should update comment section when new comment is submitted', async () => {
      const onChange = jest.fn()
      const eventWithComments = mockEvents[1]

      render(
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <RecoilObserver node={eventsState} onChange={onChange} />
            <EventModal eventId={eventWithComments.id} toggleModal={toggleModal} />
          </RecoilRoot>
        </ThemeProvider>
      )

      const commentsBefore = await screen.findAllByTestId('comment')
      expect(commentsBefore).toBeDefined()

      const input = (await screen.findAllByTestId('post-comment-input'))[0]
      expect(input).toBeInTheDocument()

      fireEvent.change(input, { target: { value: 'Lorem Ipsum' } })

      const button = (await screen.findAllByTestId('post-comment-button'))[0]
      expect(button).toBeInTheDocument()

      fireEvent.click(button)

      const commentsAfter = await screen.findAllByTestId('comment')
      expect(commentsAfter.length).toBe(commentsBefore.length + 1)
    })
  })
})
