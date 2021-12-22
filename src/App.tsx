import React from 'react'
import { RecoilRoot } from 'recoil'
import { Wrapper } from './App.styled'
import { ThemeProvider } from 'styled-components'
import { ModalProvider } from 'styled-react-modal'

import theme from './themes'

import EventList from './components/EventList'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <Header />
          <Wrapper className="App">
            <EventList />
          </Wrapper>
          <Footer />
        </ModalProvider>
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default App
