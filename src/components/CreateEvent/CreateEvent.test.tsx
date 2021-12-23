import { ReactWrapper, shallow, mount } from 'enzyme'
import CreateEvent from '.'

describe('CreateEvent component', () => {
  it('should render without props', () => {
    shallow(<CreateEvent />)
  })
  it('should render with toggleModal prop', () => {
    shallow(<CreateEvent toggleModal={jest.fn()} />)
  })

  describe('Blackbox', () => {
    let wrapper: ReactWrapper

    beforeEach(() => {
      wrapper = mount(<CreateEvent toggleModal={jest.fn()} />)
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
      const timeInput = wrapper.find('[data-testid="date-input"]').first()

      timeInput.simulate('change', { target: { value: testInput } })
      expect(timeInput.render().val()).toBe(testInput)
    })
  })
})
