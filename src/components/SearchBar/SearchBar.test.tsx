import { mount, shallow } from 'enzyme'
import SearchBar from '.'

describe('SearchBar component', () => {
  it('should render without errors', () => {
    shallow(<SearchBar />)
  })

  describe('Whitebox tests', () => {
    it('should render empty input field initially', () => {
      const wrapper = shallow(<SearchBar />)
      const input = wrapper.find('[data-test="search-input"]')
      expect(input.exists()).toBe(true)
      expect(input.render().val()).toBe('')
    })

    it('should render text in input field on change', () => {
      const testInput = 'hello'

      const wrapper = mount(<SearchBar />)
      const input = wrapper.find('[data-test="search-input"]')
      expect(input.exists()).toBe(true)

      input.simulate('change', { target: { value: testInput } })
      expect(input.render().val()).toBe(testInput)
    })

    it('should render a button', () => {
      const wrapper = mount(<SearchBar />)
      const button = wrapper.find('[data-test="search-button"]')
      expect(button.exists()).toBe(true)
    })

    it('should clear input field on search submit', () => {
      const wrapper = mount(<SearchBar />)

      const input = wrapper.find('[data-test="search-input"]')
      const testInput = 'hello'
      input.simulate('change', { target: { value: testInput } })
      expect(input.render().val()).toBe(testInput)

      const button = wrapper.find('[data-test="search-button"]')
      button.simulate('click')

      wrapper.update()
      expect(input.render().val()).toBe('')
    })
  })
})
