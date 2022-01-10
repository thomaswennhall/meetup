import React from 'react'
import { Label } from '../../../themes/typography'

interface CheckboxProps {
  label: string
  isChecked: boolean
  checkHandler: () => void
}

const Checkbox: React.FC<CheckboxProps> = ({ label, isChecked, checkHandler }) => {
  return (
    <div>
      <input
        data-testid="checkbox"
        type="checkbox"
        id={label}
        name={label}
        checked={isChecked}
        onChange={checkHandler}
      />
      <Label htmlFor={label}>{label}</Label>
    </div>
  )
}

export default Checkbox
