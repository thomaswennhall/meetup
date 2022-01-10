import { mount, ReactWrapper, shallow } from 'enzyme'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Checkbox from '.'

describe('Checkbox component', () => {
  it('should render without errors', () => {
    const props = {
      label: 'label',
      isChecked: false,
      checkHandler: jest.fn(),
    }
    shallow(<Checkbox {...props} />)
  })

  describe('Whitebox', () => {
    const props = {
      label: 'label',
      isChecked: false,
      checkHandler: jest.fn(),
    }
    let wrapper: ReactWrapper
    beforeEach(() => {
      wrapper = mount(<Checkbox {...props} />)
    })

    it('should render text from props', () => {
      const label = wrapper.find('label')
      expect(label.text()).toBe(props.label)
    })
    it('should check box on click', () => {
      render(<Checkbox {...props} />)
      const input = screen.getByTestId('checkbox')
      expect(input).toBeInTheDocument()
      expect(input).not.toBeChecked()
      userEvent.click(input)
      expect(props.checkHandler).toHaveBeenCalledTimes(1)
    })
  })
})
