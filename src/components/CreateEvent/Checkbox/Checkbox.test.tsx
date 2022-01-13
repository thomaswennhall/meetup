import { shallow } from 'enzyme'
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

    beforeEach(() => {
      render(<Checkbox {...props} />)
    })

    it('should render text from props', () => {
      const label = screen.getByText(props.label)
      expect(label).toBeInTheDocument()
    })
    it('should check box on click', () => {
      const input = screen.getByTestId('checkbox')
      expect(input).toBeInTheDocument()
      expect(input).not.toBeChecked()
      userEvent.click(input)
      expect(props.checkHandler).toHaveBeenCalledTimes(1)
    })
  })
})
