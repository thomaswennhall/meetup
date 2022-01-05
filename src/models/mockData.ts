import { IEvent } from '.'

const mockEvents: IEvent[] = [
  {
    id: 'oijf+mfkmek',
    title: 'NyårsAfton',
    date: new Date('2021-12-31'),
    time: '18:00',
    place: 'Stockholm',
    attendees: 15,
    maxAttendees: 20,
    rating: [5, 3],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus et in lorem gravida rhoncus. Bibendum ut sit in diam lobortis. Enim, aliquam erat sit tincidunt.'
  },
  {
    id: 'oijf+94jt038f',
    title: 'Julafton',
    date: new Date('2021-12-24'),
    time: '15:00',
    place: 'online',
    attendees: 10,
    maxAttendees: 12,
    comments: [
      { id: '1', text: 'Impsum ha?' },
      { id: '2', text: 'Gravida rhoncus mannen!' }
    ],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus et in lorem gravida rhoncus. Bibendum ut sit in diam lobortis. Enim, aliquam erat sit tincidunt.'
  },
  {
    id: 'oijf+foijfeeijij',
    title: 'Juldagen',
    date: new Date('2021-12-25'),
    time: '15:00',
    place: 'online',
    attendees: 10,
    maxAttendees: 15,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus et in lorem gravida rhoncus. Bibendum ut sit in diam lobortis. Enim, aliquam erat sit tincidunt.'
  },
  {
    id: 'kjkjkjkjkjk',
    title: 'Annandagen',
    date: new Date('2021-12-26'),
    time: '07:00',
    place: 'online',
    attendees: 2,
    maxAttendees: 2,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus et in lorem gravida rhoncus. Bibendum ut sit in diam lobortis. Enim, aliquam erat sit tincidunt.'
  },
  {
    id: 'kljpofjpr9ui3209r',
    title: 'Födelsedag',
    date: new Date('2022-02-15'),
    time: '07:00',
    place: 'Överallt',
    attendees: 1,
    maxAttendees: 1000,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus et in lorem gravida rhoncus. Bibendum ut sit in diam lobortis. Enim, aliquam erat sit tincidunt.'
  },
  {
    id: 'leet1337',
    title: 'Midsommar',
    date: new Date('2022-06-24'),
    time: '07:00',
    place: 'Västerås',
    attendees: 8,
    maxAttendees: 12,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus et in lorem gravida rhoncus. Bibendum ut sit in diam lobortis. Enim, aliquam erat sit tincidunt.'
  }
]

export default mockEvents
