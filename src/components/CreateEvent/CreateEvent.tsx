import React, { FunctionComponent, useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { IEvent, IThemeCheck, Theme } from '../../models'

import CtaButton from '../CtaButton'
import * as S from './CreateEvent.styled'
import { useSetRecoilState } from 'recoil'
import eventsState from '../../Recoil/atoms/events'
import { Label } from '../../themes/typography'
import { themes } from '../../models'
import Checkbox from './Checkbox'

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
    place: 'online',
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

  const initCheckedThemes = themes.reduce(
    (obj, key) => Object.assign(obj, { [key]: false }),
    {}
  ) as IThemeCheck

  const [checkedThemes, setCheckedThemes] = useState(initCheckedThemes)

  useEffect(() => {
    const themesToInclude = themes.filter(theme => checkedThemes[theme] === true)
    setNewEvent(prev => ({ ...prev, themes: themesToInclude }))
  }, [checkedThemes])

  const handleThemesCheck = (theme: Theme) => {
    setCheckedThemes(prev => ({ ...prev, [theme]: !checkedThemes[theme] }))
  }

  const setEvents = useSetRecoilState(eventsState)
  const createNewEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (newEvent.title && newEvent.description) {
      setEvents(events => [...events, newEvent])
      console.log(newEvent)
      toggleModal()
    }
  }

  return (
    <S.Form data-testid="create_event-form" onSubmit={e => createNewEvent(e)}>
      <Label htmlFor="title">title</Label>
      <S.TitleInput
        name="title"
        id="title"
        type="text"
        value={newEvent.title}
        onChange={e => changeHandler(e)}
        data-testid="title-input"
        required
        minLength={3}
      />
      <Label htmlFor="description">description</Label>
      <S.DescriptionInput
        name="description"
        id="description"
        value={newEvent.description}
        onChange={e => changeHandler(e)}
        data-testid="description-input"
        required
      />
      <Label htmlFor="date">when?</Label>
      <S.DateInput
        name="date"
        id="date"
        type="date"
        value={newEvent.date.toLocaleDateString()}
        onChange={e => changeHandler(e)}
        data-testid="date-input"
        required
      />
      <Label htmlFor="time">what time?</Label>
      <S.TimeInput
        name="time"
        id="time"
        type="time"
        value={newEvent.time}
        onChange={e => changeHandler(e)}
        data-testid="time-input"
        required
      />
      <Label htmlFor="place">where?</Label>
      <S.PlaceInput
        name="place"
        id="place"
        type="text"
        value={newEvent.place}
        onChange={e => changeHandler(e)}
        data-testid="place-input"
        required
      />
      <Label htmlFor="maxAttendees">how many can attend?</Label>
      <S.MaxAttendeesInput
        name="maxAttendees"
        id="maxAttendees"
        type="number"
        value={newEvent.maxAttendees}
        onChange={e => changeHandler(e)}
        data-testid="max_attendees-input"
        required
        min={1}
      />
      <div data-testid="themes-input">
        {themes.map(theme => (
          <Checkbox
            data-testid="theme-checkbox"
            key={theme}
            isChecked={checkedThemes[theme]}
            checkHandler={() => handleThemesCheck(theme)}
            label={theme}
          />
        ))}
      </div>
      <CtaButton testId="create-button" text="Create Meetup" clickHandler={() => {}} />
    </S.Form>
  )
}

export default CreateEvent
