import { shallow } from 'enzyme'
import CtaButton from '.'

const props = {
  text: 'click me',
  clickHandler: () => {}
}

describe('CtaButton component', () => {
  it('should render without errors', () => {
    shallow(<CtaButton {...props} />)
  })
  describe('Whitebox', () => {
    it('should render text from prop', () => {
      const wrapper = shallow(<CtaButton {...props} />)
      const button = wrapper.find('[data-testid="cta-button"]')
      expect(button.text()).toBe(props.text)
    })
    it('should call clickHandler from props on click', () => {
      const mockHandler = jest.fn()

      const wrapper = shallow(<CtaButton text="text" clickHandler={mockHandler} />)
      const button = wrapper.find('[data-testid="cta-button"]')
      button.simulate('click')
      expect(mockHandler).toHaveBeenCalled()
    })
  })
})
