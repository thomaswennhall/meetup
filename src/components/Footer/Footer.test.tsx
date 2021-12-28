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
    // it('should show create event modal on click', () => {
    //   const button = wrapper.find('[data-testid="open_create-button"]').first()
    //   console.log(wrapper.debug())
    //   button.simulate('click')

    //   const form = wrapper.find('[data-testid="create_event-form"]')
    //   expect(form.exists()).toBeTruthy()
    // })
  })

  // describe('Whitebox', () => {
  //   beforeEach(() => {})
  //   // it('should show create event modal on click', async () => {
  //   //   render(
  //   //     <ThemeProvider theme={theme}>
  //   //       <RecoilRoot>
  //   //         <Footer />
  //   //       </RecoilRoot>
  //   //     </ThemeProvider>
  //   //   )
  //   //   const button = await screen.findByTestId('open_create-button')
  //   //   fireEvent.click(button)
  //   //   const form = await screen.findByTestId('create_event-form')
  //   //   expect(form).toBeInTheDocument()
  //   // })
  // })
})
