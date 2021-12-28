import React, { FunctionComponent, useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { IEvent } from '../../models'

import CtaButton from '../CtaButton'
import * as S from './CreateEvent.styled'
import { useRecoilState, useSetRecoilState } from 'recoil'
import eventsSelector from '../../Recoil/selectors/eventsSelector'
import eventsState from '../../Recoil/atoms/events'

interface Props {
  toggleModal?: () => void
}

const CreateEvent: FunctionComponent<Props> = ({ toggleModal = () => {} }) => {
  const initEvent: IEvent = {
    id: nanoid(),
    title: '',
    description: '',
    date: new Date(Date.now()),
    time: '18:00',
    attendees: 0,
    maxAttendees: 10,
    place: 'online'
  }
  const [newEvent, setNewEvent] = useState<IEvent>(initEvent)

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    switch (e.currentTarget.name) {
      case 'date':
        setNewEvent({ ...newEvent, [e.currentTarget.name]: new Date(e.target.value) })
        break
      case 'maxAttendees':
        setNewEvent({ ...newEvent, [e.currentTarget.name]: +e.target.value })
        break
      default:
        setNewEvent({ ...newEvent, [e.currentTarget.name]: e.target.value })
        break
    }
  }

  //const [events] = useRecoilState(eventsSelector)
  const setEvents = useSetRecoilState(eventsState)
  const createNewEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newEvent.title && newEvent.description) {
      setEvents(events => [...events, newEvent])
    }
  }

  return (
    <S.Form data-testid="create_event-form" onSubmit={e => createNewEvent(e)}>
      <S.TitleInput
        name="title"
        type="text"
        placeholder="Title..."
        value={newEvent.title}
        onChange={e => changeHandler(e)}
        data-testid="title-input"
        required
        minLength={3}
      />
      <S.DescriptionInput
        name="description"
        placeholder="Description..."
        value={newEvent.description}
        onChange={e => changeHandler(e)}
        data-testid="description-input"
        required
      />
      <S.DateInput
        name="date"
        type="date"
        value={newEvent.date.toLocaleDateString()}
        onChange={e => changeHandler(e)}
        data-testid="date-input"
        required
      />
      <S.TimeInput
        name="time"
        type="time"
        value={newEvent.time}
        onChange={e => changeHandler(e)}
        data-testid="time-input"
        required
      />
      <S.PlaceInput
        name="place"
        type="text"
        value={newEvent.place}
        onChange={e => changeHandler(e)}
        data-testid="place-input"
        required
      />
      <S.MaxAttendeesInput
        name="maxAttendees"
        type="number"
        value={newEvent.maxAttendees}
        onChange={e => changeHandler(e)}
        data-testid="max_attendees-input"
        required
        min={1}
      />
      <CtaButton testId="create-button" text="Create Meetup" clickHandler={() => {}} />
    </S.Form>
  )
}

export default CreateEvent
