import React from 'react'
import { render } from '@testing-library/react'
import App from './App'
import { RecoilRoot, useRecoilState } from 'recoil'

test('should render without errors', () => {
  render(
    <RecoilRoot>
      <App />
    </RecoilRoot>
  )
})
