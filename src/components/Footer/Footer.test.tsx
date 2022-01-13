import { shallow, mount, ReactWrapper } from 'enzyme'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from '../../themes'
import Footer from '.'
import { RecoilRoot } from 'recoil'

describe('Footer component', () => {
  it('should render without errors', () => {
    shallow(<Footer />)
  })

  describe('Blackbox', () => {
    let wrapper: ReactWrapper
    beforeEach(() => {
      wrapper = mount(
        <ThemeProvider theme={theme}>
          <Footer />
        </ThemeProvider>
      )
    })
    it('should render CtaButton component', () => {
      const button = wrapper.find('[data-test="cta-button"]')
      expect(button.exists()).toBeTruthy()
    })
    it('should not show create event modal initially', () => {
      const createForm = wrapper.find('[data-testid="create_event-form"]')

      expect(createForm.exists()).toBeFalsy()
    })
    it('should have a modal component', () => {
      const modal = wrapper.find('[data-testid="create-event-modal"]')
      expect(modal.exists()).toBeTruthy()
    })

    it('should show event modal on click', async () => {
      render(
        <ThemeProvider theme={theme}>
          <Footer />
        </ThemeProvider>
      )

      const button = await screen.findByTestId('open_create-button')
      fireEvent.click(button)

      const modal = screen.findByTestId('create_event-form')

      expect(modal).toBeDefined()
    })
  })
})
