import { shallow, mount, ReactWrapper } from 'enzyme'
import { RecoilRoot } from 'recoil'

import Header from '.'
import SearchBar from '../SearchBar'

describe('Header component', () => {
  it('should render without errors', () => {
    shallow(<Header />)
  })

  describe('Whitebox tests', () => {
    let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>
    beforeEach(() => {
      wrapper = mount(
        <RecoilRoot>
          <Header />
        </RecoilRoot>
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
