import React from 'react'
import { RecoilRoot } from 'recoil'
import { Wrapper } from './App.styled'
import { ThemeProvider } from 'styled-components'
import theme from './themes'
import * as S from './themes/typography'

import EventList from './components/EventList'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Header />
        <Wrapper className="App">
          <EventList />
        </Wrapper>
        <Footer />
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default App
