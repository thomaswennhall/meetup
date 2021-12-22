import { shallow, mount, ReactWrapper } from 'enzyme'
import { render, fireEvent, screen } from '@testing-library/react'
import EventModal from '.'
import { RecoilRoot } from 'recoil'
import { RecoilObserver } from '../../Recoil/observers'
import eventsState from '../../Recoil/atoms/events'
import mockEvents from '../../models/mockData'

describe('EventModal component', () => {
  const event = mockEvents[0]

  const toggleModal = jest.fn()

  it('should render without errors', () => {
    shallow(
      <RecoilRoot>
        <EventModal eventId={event.id} toggleModal={toggleModal} />
      </RecoilRoot>
    )
  })

  describe('Blackbox', () => {
    let wrapper: ReactWrapper

    beforeEach(() => {
      wrapper = mount(
        <RecoilRoot>
          <EventModal eventId={event.id} toggleModal={toggleModal} />
        </RecoilRoot>
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
  })

  describe('Whitebox', () => {
    beforeEach(() => {
      const onChange = jest.fn()
      render(
        <RecoilRoot>
          <RecoilObserver node={eventsState} onChange={onChange} />
          <EventModal eventId={event.id} toggleModal={toggleModal} />
        </RecoilRoot>
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

    it('should update comment section when new comment is submitted', async () => {
      const onChange = jest.fn()
      const eventWithComments = mockEvents[1]

      render(
        <RecoilRoot>
          <RecoilObserver node={eventsState} onChange={onChange} />
          <EventModal eventId={eventWithComments.id} toggleModal={toggleModal} />
        </RecoilRoot>
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
