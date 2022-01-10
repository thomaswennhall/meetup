import { render, screen, fireEvent } from '@testing-library/react'
import { ReactWrapper, shallow, mount } from 'enzyme'
import { RecoilRoot } from 'recoil'
import CreateEvent from '.'
import { RecoilObserver } from '../../Recoil/observers'
import eventsSelector from '../../Recoil/selectors/eventsSelector'
import { themes } from '../../models'
import userEvent from '@testing-library/user-event'

describe('CreateEvent component', () => {
  it('should render without props', () => {
    shallow(
      <RecoilRoot>
        <CreateEvent />
      </RecoilRoot>
    )
  })
  it('should render with toggleModal prop', () => {
    shallow(
      <RecoilRoot>
        <CreateEvent toggleModal={jest.fn()} />
      </RecoilRoot>
    )
  })

  describe('Blackbox', () => {
    let wrapper: ReactWrapper

    const toggleModalMock = jest.fn()
    beforeEach(() => {
      wrapper = mount(
        <RecoilRoot>
          <CreateEvent toggleModal={toggleModalMock} />
        </RecoilRoot>
      )
    })

    it('should have an input for event title', () => {
      const titleInput = wrapper.find('[data-testid="title-input"]').first()
      expect(titleInput.exists()).toBeTruthy()
    })
    it('should change input value when typing new title', () => {
      const testInput = 'Title'
      const titleInput = wrapper.find('[data-testid="title-input"]').first()

      titleInput.simulate('change', { target: { value: testInput } })
      expect(titleInput.render().val()).toBe(testInput)
    })

    it('should have an input for event description', () => {
      const descInput = wrapper.find('[data-testid="description-input"]').first()
      expect(descInput.exists()).toBeTruthy()
    })
    it('should change input value when typing new description', () => {
      const testInput = 'Description bla bla bla...'
      const descInput = wrapper.find('[data-testid="description-input"]').first()

      descInput.simulate('change', { target: { value: testInput } })
      expect(descInput.render().val()).toBe(testInput)
    })

    it('should have an input for event date', () => {
      const dateInput = wrapper.find('[data-testid="date-input"]').first()
      expect(dateInput.exists()).toBeTruthy()
    })
    it('should change input value after selecting new date', () => {
      const testInput = new Date('2022-01-06').toLocaleDateString()
      const dateInput = wrapper.find('[data-testid="date-input"]').first()

      dateInput.simulate('change', { target: { value: testInput } })
      expect(dateInput.render().val()).toBe(testInput)
    })

    it('should have an input for event time', () => {
      const timeInput = wrapper.find('[data-testid="time-input"]').first()
      expect(timeInput.exists()).toBeTruthy()
    })
    it('should change input value after selecting new time', () => {
      const testInput = '15:30'
      const timeInput = wrapper.find('[data-testid="time-input"]').first()

      timeInput.simulate('change', { target: { value: testInput } })
      expect(timeInput.render().val()).toBe(testInput)
    })

    it('should have an input for event place', () => {
      const placeInput = wrapper.find('[data-testid="place-input"]').first()
      expect(placeInput.exists()).toBeTruthy()
    })
    it('should have "online" as value initially', () => {
      const placeInput = wrapper.find('[data-testid="place-input"]').first()
      expect(placeInput.render().val()).toBe('online')
    })
    it('should change input value when typing new place', () => {
      const testInput = 'Stockholm'
      const placeInput = wrapper.find('[data-testid="place-input"]').first()

      placeInput.simulate('change', { target: { value: testInput } })
      expect(placeInput.render().val()).toBe(testInput)
    })

    it('should have an input for event max attendees', () => {
      const maxAttendees = wrapper.find('[data-testid="max_attendees-input"]').first()
      expect(maxAttendees.exists()).toBeTruthy()
    })
    it('should change maxAttendees value on change', () => {
      const testInput = 100
      const maxAttendees = wrapper.find('[data-testid="max_attendees-input"]').first()

      maxAttendees.simulate('change', { target: { value: testInput } })
      expect(+maxAttendees.render().val()).toBe(testInput)
    })

    it('should have a section for event themes inputs', () => {
      const themesInput = wrapper.find('[data-testid="themes-input"]').first()
      expect(themesInput.exists()).toBeTruthy()
    })
    it('should render an input for each theme', () => {
      const checkbox = wrapper.find('[data-testid="theme-checkbox"]')
      expect(checkbox.length).toBe(themes.length)
    })
    // it('should check theme-checkbox on click', () => {
    //   const checkbox = wrapper.find('[data-testid="theme-checkbox"]').first()
    //   const input = checkbox.children('input').getElement()

    //   expect(input).not.toBeChecked()
    // })

    it('should have a button for creating an event', () => {
      const button = wrapper.find('[data-testid="create-button"]').first()
      expect(button.exists()).toBeTruthy()
    })
  })

  describe('Whitebox', () => {
    const onChange = jest.fn()
    const toggleModalMock = jest.fn()

    beforeEach(() => {
      render(
        <RecoilRoot>
          <RecoilObserver node={eventsSelector} onChange={onChange} />
          <CreateEvent toggleModal={toggleModalMock} />
        </RecoilRoot>
      )
    })

    it('should check a theme-checkbox on click', async () => {
      const checkbox = (await screen.findAllByTestId('checkbox'))[0]

      expect(checkbox).not.toBeChecked()
      userEvent.click(checkbox)
      expect(checkbox).toBeChecked()
    })
  })

  describe('Submit tests', () => {
    const onChange = jest.fn()
    const toggleModalMock = jest.fn()

    beforeEach(() => {
      render(
        <RecoilRoot>
          <RecoilObserver node={eventsSelector} onChange={onChange} />
          <CreateEvent toggleModal={toggleModalMock} />
        </RecoilRoot>
      )
    })
    it('should not update recoil state on create button click if any field is missing a value', async () => {
      const form = await screen.findByTestId('create_event-form')
      fireEvent.submit(form)
      expect(onChange).toHaveBeenCalledTimes(1)
      //  expect(onChange).toHaveBeenCalledWith('')
      //  expect(onChange).toHaveBeenCalledWith(testInput)
    })

    it('should update recoil state on create button click if all fields have a value', async () => {
      const titleInput = await screen.findByTestId('title-input')
      fireEvent.change(titleInput, { target: { value: 'title' } })

      const descInput = await screen.findByTestId('description-input')
      fireEvent.change(descInput, { target: { value: 'A description...' } })

      const dateInput = await screen.findByTestId('date-input')
      fireEvent.change(dateInput, {
        target: { value: new Date('2022-01-06').toLocaleDateString() },
      })

      const timeInput = await screen.findByTestId('time-input')
      fireEvent.change(timeInput, { target: { value: '14:00' } })

      const placeInput = await screen.findByTestId('place-input')
      fireEvent.change(placeInput, { target: { value: 'Space' } })

      const maxAttendeesInput = await screen.findByTestId('max_attendees-input')
      fireEvent.change(maxAttendeesInput, { target: { value: 100 } })

      const form = await screen.findByTestId('create_event-form')
      fireEvent.submit(form)

      expect(onChange).toHaveBeenCalledTimes(2)
    })

    it('should update recoil state on create button click if all fields have a value', async () => {
      const titleInput = await screen.findByTestId('title-input')
      fireEvent.change(titleInput, { target: { value: 'title' } })

      const descInput = await screen.findByTestId('description-input')
      fireEvent.change(descInput, { target: { value: 'A description...' } })

      const form = await screen.findByTestId('create_event-form')
      fireEvent.submit(form)

      expect(toggleModalMock).toHaveBeenCalledTimes(1)
    })
  })
})
