import { shallow, mount } from 'enzyme'
import Footer from '.'

describe('Footer component', () => {
  it('should render without errors', () => {
    shallow(<Footer />)
  })
  it('should render CtaButton component', () => {
    const wrapper = mount(<Footer />)
    const button = wrapper.find('[data-testid="cta-button"]')
    expect(button.exists()).toBeTruthy()
  })
})
