import React, { FunctionComponent, useState } from 'react'
import { useRecoilState } from 'recoil'
import searchStringState from '../../Recoil/atoms/searchString'

const SearchBar: FunctionComponent = () => {
  const [searchString, setSearchString] = useRecoilState(searchStringState)
  const [searchInput, setSearchInput] = useState<string>('')

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }
  const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchString(searchInput)
    setSearchInput('')
  }

  return (
    <form onSubmit={e => submitSearch(e)}>
      <input
        data-test="search-input"
        data-testid="search-input"
        type="text"
        value={searchInput}
        onChange={e => changeHandler(e)}
      />

      <button type="submit" data-test="search-button" data-testid="search-button">
        search
      </button>
    </form>
  )
}

export default SearchBar
