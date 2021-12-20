import React, { FunctionComponent, useState } from 'react'

const SearchBar: FunctionComponent = () => {
  const [searchInput, setSearchInput] = useState<string>('')
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }
  const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchInput('')
  }

  return (
    <form onSubmit={e => submitSearch(e)}>
      <input
        data-test="search-input"
        type="text"
        value={searchInput}
        onChange={e => changeHandler(e)}
      />

      <button data-test="search-button">search</button>
    </form>
  )
}

export default SearchBar
