import React from 'react'
import { RecoilRoot } from 'recoil'
import { Wrapper } from './App.styled'
import { ThemeProvider } from 'styled-components'
import theme from './themes'
import * as S from './themes/typography'

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Wrapper className="App">
          <S.H1>Heading 1</S.H1>
          <S.H2>Heading 2</S.H2>
          <S.H3>Heading 3</S.H3>
          <S.P>Paragraph</S.P>
        </Wrapper>
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default App
