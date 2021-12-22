import { shallow, ShallowWrapper } from 'enzyme'
import EventModal from '.'

describe('EventModal component', () => {
  const event = {
    id: 'oijf+94jt038f',
    title: 'Julafton',
    date: new Date('2021-12-24'),
    time: '15:00',
    place: 'online',
    maxAttendees: 50,
    attendees: 32,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus et in lorem gravida rhoncus. Bibendum ut sit in diam lobortis. Enim, aliquam erat sit tincidunt.'
  }
  const toggleModal = jest.fn()

  it('should render without errors', () => {
    shallow(<EventModal event={event} toggleModal={toggleModal} />)
  })

  describe('blackbox tests', () => {
    let wrapper: ShallowWrapper

    beforeEach(() => {
      wrapper = shallow(<EventModal event={event} toggleModal={toggleModal} />)
    })

    it('should render correct title for event', () => {
      const title = wrapper.find('[data-testid="event-modal-title"]')
      expect(title.text()).toBe(event.title)
    })

    it('should render correct date for event', () => {
      const date = wrapper.find('[data-testid="event-modal-date"]')
      expect(date.text()).toBe(`${event.date.toLocaleDateString()} ${event.time}`)
    })

    it('should render correct place for event', () => {
      const place = wrapper.find('[data-testid="event-modal-place"]')
      expect(place.text()).toBe(event.place)
    })
    it('should render description for event', () => {
      const desc = wrapper.find('[data-testid="event-modal-description"]')
      expect(desc.text()).toBe(event.description)
    })
    it('should render the number of people who are attending the event', () => {
      const attendees = wrapper.find('[data-testid="event-modal-attendees"]')
      expect(attendees.text()).toContain(`${event.attendees}/${event.maxAttendees}`)
    })
  })
})
