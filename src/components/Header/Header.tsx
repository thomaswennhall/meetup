import React, { FunctionComponent } from 'react'

import * as S from './Header.styled'
import { ReactComponent as Logo } from '../../assets/logo.svg'

import SearchBar from '../SearchBar'

const Header: FunctionComponent = () => {
  return (
    <S.Wrapper data-test="header">
      <Logo data-test="header-logo" />
      <SearchBar />
    </S.Wrapper>
  )
}

export default Header
