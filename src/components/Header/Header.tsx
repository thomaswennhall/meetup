import React, { FunctionComponent } from 'react'
import SearchBar from '../SearchBar'
import { ReactComponent as Logo } from '../../assets/logo.svg'

const Header: FunctionComponent = () => {
  return (
    <header data-test="header">
      <Logo data-test="header-logo" />
      <SearchBar />
    </header>
  )
}

export default Header
