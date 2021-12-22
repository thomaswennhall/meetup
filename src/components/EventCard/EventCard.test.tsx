import { shallow } from 'enzyme'
import EventCard from '.'

describe('EventCard component', () => {
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

  it('should render without errors', () => {
    shallow(<EventCard event={event} />)
  })

  describe('blackbox tests', () => {
    it('should render correct title for event', () => {
      const wrapper = shallow(<EventCard event={event} />)
      const title = wrapper.find('[data-test="event-title"]')

      expect(title.text()).toBe(event.title)
    })
    it('should render correct date for event', () => {
      const wrapper = shallow(<EventCard event={event} />)
      const date = wrapper.find('[data-test="event-date"]')

      expect(date.text()).toBe(`${event.date.toLocaleDateString()} ${event.time}`)
    })
    it('should render correct place for event', () => {
      const wrapper = shallow(<EventCard event={event} />)
      const place = wrapper.find('[data-test="event-place"]')

      expect(place.text()).toBe(event.place)
    })
    it('should render a shortened version of description for event', () => {
      const wrapper = shallow(<EventCard event={event} />)
      const desc = wrapper.find('[data-test="event-description"]')

      expect(desc.text().length).toBe(93)
    })
    it('should render the number of people who are attending the event', () => {
      const wrapper = shallow(<EventCard event={event} />)
      const attendees = wrapper.find('[data-test="event-attendees"]')

      expect(attendees.text()).toContain(`${event.attendees}/${event.maxAttendees}`)
    })
  })
})
