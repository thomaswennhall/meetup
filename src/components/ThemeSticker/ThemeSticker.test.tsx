import { shallow } from 'enzyme'
import ThemeSticker from '.'
import { Theme } from '../../models'

describe('ThemeSticker component', () => {
  const theme = Theme.MUSIC

  it('should render withour errors', () => {
    shallow(<ThemeSticker theme={theme} />)
  })

  it('should render theme from props as text', () => {
    const wrapper = shallow(<ThemeSticker theme={theme} />)
    const textElement = wrapper.find('[data-testid="theme-sticker-text"]')
    expect(textElement.text()).toBe(theme)
  })
})
