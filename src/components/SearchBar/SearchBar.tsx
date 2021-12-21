import React, { FunctionComponent, useState } from 'react'
import { useRecoilState } from 'recoil'
import searchStringState from '../../Recoil/atoms/searchString'

import { StyledInput } from './SearchBar.styled'

const SearchBar: FunctionComponent = () => {
  const [searchString, setSearchString] = useRecoilState(searchStringState)

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value)
  }

  return (
    <StyledInput
      data-test="search-input"
      data-testid="search-input"
      type="text"
      placeholder="search..."
      value={searchString}
      onChange={e => changeHandler(e)}
    />
  )
}

export default SearchBar
