import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Wrapper } from './App.styled'
import theme from './themes'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper className="App">Empty</Wrapper>
    </ThemeProvider>
  )
}

export default App
