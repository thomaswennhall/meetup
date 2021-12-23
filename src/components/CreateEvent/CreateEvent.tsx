import React, { FunctionComponent, useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { IEvent } from '../../models'

import * as S from './CreateEvent.styled'

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
      default:
        setNewEvent({ ...newEvent, [e.currentTarget.name]: e.target.value })
        break
    }
  }

  return (
    <S.Form>
      <S.TitleInput
        name="title"
        type="text"
        placeholder="Title..."
        value={newEvent.title}
        onChange={e => changeHandler(e)}
        data-testid="title-input"
      />
      <S.DescriptionInput
        name="description"
        value={newEvent.description}
        onChange={e => changeHandler(e)}
        data-testid="description-input"
      />
      <S.DateInput
        name="date"
        type="date"
        value={newEvent.date.toLocaleDateString()}
        onChange={e => changeHandler(e)}
        data-testid="date-input"
      />
      <S.TimeInput
        name="time"
        type="time"
        value={newEvent.time}
        onChange={e => changeHandler(e)}
        data-testid="time-input"
      />
    </S.Form>
  )
}

export default CreateEvent
