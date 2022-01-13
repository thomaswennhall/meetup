import { shallow, mount, ReactWrapper } from 'enzyme'
import { render, fireEvent, screen } from '@testing-library/react'
import EventModal from '.'
import { RecoilRoot } from 'recoil'
import { RecoilObserver } from '../../Recoil/observers'
import eventsState from '../../Recoil/atoms/events'
import mockEvents from '../../models/mockData'
import { ThemeProvider } from 'styled-components'
import theme from '../../themes'
import { IEvent } from '../../models'

describe('EventModal component', () => {
  const futureEvent: IEvent = mockEvents[5]
  const pastEvent: IEvent = mockEvents[0]
  const noRatingEvent: IEvent = mockEvents[1]

  const toggleModal = jest.fn()

  it('should render without errors', () => {
    shallow(
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <EventModal eventId={futureEvent.id} toggleModal={toggleModal} />
        </RecoilRoot>
      </ThemeProvider>
    )
  })

  describe('Rendering future Events', () => {
    let wrapper: ReactWrapper

    beforeEach(() => {
      wrapper = mount(
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <EventModal eventId={futureEvent.id} toggleModal={toggleModal} />
          </RecoilRoot>
        </ThemeProvider>
      )
    })

    it('should render correct title for event', () => {
      const title = wrapper.find('[data-testid="event-modal-title"]').first()
      expect(title.text()).toBe(futureEvent.title)
    })

    it('should render correct date for event', () => {
      const date = wrapper.find('[data-testid="event-modal-date"]').first()
      expect(date.text()).toBe(`${futureEvent.date.toLocaleDateString()} ${futureEvent.time}`)
    })

    it('should render correct place for event', () => {
      const place = wrapper.find('[data-testid="event-modal-place"]').first()
      expect(place.text()).toBe(futureEvent.place)
    })

    it('should render description for event', () => {
      const desc = wrapper.find('[data-testid="event-modal-description"]').first()
      expect(desc.text()).toBe(futureEvent.description)
    })

    it('should render the number of people who are attending the event', () => {
      const attendees = wrapper.find('[data-testid="event-modal-attendees"]').first()
      expect(attendees.text()).toContain(`${futureEvent.attendees}/${futureEvent.maxAttendees}`)
    })

    it('should have a comments section', () => {
      const comments = wrapper.find('[data-testid="comments-section"]').first()
      expect(comments.exists()).toBeTruthy()
      expect(comments.text()).toContain('Comments')
    })

    it('should NOT show a rating if event does not contain one', () => {
      const wrapper1 = mount(
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <EventModal eventId={noRatingEvent.id} toggleModal={toggleModal} />
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

  describe('Rendering past events', () => {
    let wrapper: ReactWrapper

    beforeEach(() => {
      wrapper = mount(
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <EventModal eventId={pastEvent.id} toggleModal={toggleModal} />
          </RecoilRoot>
        </ThemeProvider>
      )
    })

    it('should show a rating if event contains one', () => {
      const rating = wrapper.find('[data-testid="event-modal-rating"]').first()
      expect(rating.exists()).toBeTruthy()
      expect(rating.text()).toContain(pastEvent.rating![0])
    })

    it('should not have a button if time of event as passed', () => {
      const attendButton = wrapper.find('[data-testid="event-modal-button"]')
      expect(attendButton.exists()).toBeFalsy()
    })

    it('should update event rating on change', async () => {
      render(
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <EventModal eventId={pastEvent.id} toggleModal={toggleModal} />
          </RecoilRoot>
        </ThemeProvider>
      )

      let rating = (await screen.findAllByTestId('event-modal-rating'))[0]
      expect(rating).toHaveTextContent(`${pastEvent.rating![0]}`)

      const testRating = 3
      const ratingInput = await screen.findByTestId('rating-input')
      fireEvent.change(ratingInput, { target: { value: testRating } })

      const ratingForm = await screen.findByTestId('rating-form')
      fireEvent.submit(ratingForm)

      rating = (await screen.findAllByTestId('event-modal-rating'))[0]

      const newRating =
        (pastEvent.rating![0] * pastEvent.rating![1] + testRating) / (pastEvent.rating![1] + 1)
      expect(rating).toHaveTextContent(`${newRating}`)
    })
  })

  describe('Attending event', () => {
    beforeEach(() => {
      const onChange = jest.fn()
      render(
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <RecoilObserver node={eventsState} onChange={onChange} />
            <EventModal eventId={futureEvent.id} toggleModal={toggleModal} />
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
      expect(attendeesEl).toHaveTextContent(`${futureEvent.attendees}/${futureEvent.maxAttendees}`)

      const button = await screen.findByTestId('event-modal-button')
      fireEvent.click(button)

      attendeesEl = await screen.findByTestId('event-modal-attendees')
      expect(attendeesEl).toHaveTextContent(
        `${futureEvent.attendees + 1}/${futureEvent.maxAttendees}`
      )
    })

    it('should not update events attendees if attendance is full', async () => {
      let attendeesEl = await screen.findByTestId('event-modal-attendees')
      expect(attendeesEl).toHaveTextContent(`${futureEvent.attendees}/${futureEvent.maxAttendees}`)

      const button = await screen.findByTestId('event-modal-button')

      for (let i = futureEvent.attendees; i < futureEvent.maxAttendees; i++) {
        fireEvent.click(button)
      }

      attendeesEl = await screen.findByTestId('event-modal-attendees')
      expect(attendeesEl).toHaveTextContent(
        `${futureEvent.maxAttendees}/${futureEvent.maxAttendees}`
      )

      fireEvent.click(button)

      attendeesEl = await screen.findByTestId('event-modal-attendees')
      expect(attendeesEl).toHaveTextContent(
        `${futureEvent.maxAttendees}/${futureEvent.maxAttendees}`
      )
    })
  })

  describe('Other tests', () => {
    it('should create event rating on change if event does not have a rating yet', async () => {
      const onChange = jest.fn()

      render(
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <RecoilObserver node={eventsState} onChange={onChange} />
            <EventModal eventId={noRatingEvent.id} toggleModal={toggleModal} />
          </RecoilRoot>
        </ThemeProvider>
      )

      let rating = await screen.findAllByTestId('event-modal-rating')
      expect(rating[0]).toHaveTextContent('no rating yet')

      const testRating = 3
      const ratingInput = await screen.findByTestId('rating-input')
      fireEvent.change(ratingInput, { target: { value: testRating } })

      const ratingForm = await screen.findByTestId('rating-form')
      fireEvent.submit(ratingForm)

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
