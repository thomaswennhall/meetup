import { shallow, mount, ReactWrapper } from 'enzyme'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from 'styled-components'

import Header from '.'
import theme from '../../themes'

describe('Header component', () => {
  it('should render without errors', () => {
    shallow(
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    )
  })

  describe('Blackbox', () => {
    let wrapper: ReactWrapper
    beforeEach(() => {
      wrapper = mount(
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <Header />
          </RecoilRoot>
        </ThemeProvider>
      )
    })

    it('should render a search bar', () => {
      const searchBar = wrapper.find('[data-test="search-input"]')
      expect(searchBar.exists()).toBeTruthy()
    })

    it('should render a logo', () => {
      const logo = wrapper.find('[data-test="header-logo"]')
      expect(logo.exists()).toBeTruthy()
    })
  })
})
