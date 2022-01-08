import React, { FunctionComponent } from 'react'
import { IComment, IEvent } from '../../models'
import * as S from './EventModal.styled'
import { H1, H3, P } from '../../themes/typography'
import { useRecoilState } from 'recoil'
import eventsState from '../../Recoil/atoms/events'

import CtaButton from '../CtaButton'
import RatingForm from './RatingForm'
import CommentSection from './CommentSection'

interface Props {
  eventId: string
  toggleModal: (toggle: boolean) => void
}

const EventModal: FunctionComponent<Props> = ({ eventId, toggleModal }) => {
  const [events, setEvents] = useRecoilState(eventsState)

  const event = { ...[...events].find(ev => ev.id === eventId) } as IEvent

  const attend = () => {
    if (event.attendees < event.maxAttendees) {
      event!.attendees = event!.attendees! + 1
      const updatedEvents = [...events].map(ev => (ev.id === event.id ? event : ev))
      setEvents([...updatedEvents])
    }
  }

  const postComment = (newComment: IComment) => {
    event.comments = event.comments ? [...event.comments, newComment] : [newComment]
    const updatedEvents = [...events].map(ev => (ev.id === event.id ? event : ev))
    setEvents([...updatedEvents])
  }

  const rate = (ratingValue: number) => {

    const updatedRatingAmount: number = event.rating ? event.rating![1] + 1 : 1
    const updatedRatingValue: number = 
      event.rating ? 
      +((event.rating![0] * event.rating![1] + ratingValue) / updatedRatingAmount).toFixed(2) 
      : ratingValue

    event.rating = [updatedRatingValue, updatedRatingAmount]
    const updatedEvents = [...events].map(ev => (ev.id === event.id ? event : ev))
    setEvents([...updatedEvents])
  }

  const hasPassed: boolean = Date.now() - +event.date  > 0

  return (
    <S.Container data-testid="event-modal">
      <H1 data-testid="event-modal-title">{event.title}</H1>
      <S.Rating data-testid="event-modal-rating">	&#9733; {event.rating ? event.rating[0] : 'no rating yet'}</S.Rating>
      <S.Date hasPassed={hasPassed} data-testid="event-modal-date">
        {event.date.toLocaleDateString()} {event.time}
      </S.Date>
      <H3 data-testid="event-modal-place">{event.place}</H3>
      <H3 data-testid="event-modal-attendees">
        {event.attendees}/{event.maxAttendees}
      </H3>
      <P data-testid="event-modal-description">{event.description}</P>
      <CtaButton testId="event-modal-button" text="Attend" clickHandler={attend} />
      <RatingForm rate={rate} />
      <CommentSection comments={event.comments} postComment={postComment} />
    </S.Container>
  )
}

export default EventModal
