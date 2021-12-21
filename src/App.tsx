import React from 'react'
import { RecoilRoot } from 'recoil'
import { Wrapper } from './App.styled'
import { ThemeProvider } from 'styled-components'
import theme from './themes'
import * as S from './themes/typography'

import EventList from './components/EventList'
import Header from './components/Header'

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Wrapper className="App">
          <Header />
          <S.H1>Meetups</S.H1>
          <EventList />
        </Wrapper>
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default App
