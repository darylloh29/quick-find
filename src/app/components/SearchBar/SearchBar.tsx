'use client'

import { useState } from 'react'
import { Input, Button } from '@nextui-org/react'
import SearchIcon from '../icons/SearchIcon'

export default function SearchBar() {
  const [query, setQuery] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!query) return
    console.log(query)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-wrap md:flex-nowrap"
    >
      <Input
        type="search"
        placeholder="Type to search..."
        radius="sm"
        value={query}
        onChange={handleInputChange}
      />
      <Button
        type="submit"
        color="primary"
        radius="sm"
        startContent={<SearchIcon />}
      >
        Search
      </Button>
    </form>
  )
}
