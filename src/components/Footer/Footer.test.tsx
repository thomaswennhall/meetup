import { shallow, mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import theme from '../../themes'
import Footer from '.'

describe('Footer component', () => {
  it('should render without errors', () => {
    shallow(<Footer />)
  })
  it('should render CtaButton component', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <Footer />
      </ThemeProvider>
    )
    const button = wrapper.find('[data-testid="cta-button"]')
    expect(button.exists()).toBeTruthy()
  })
})
