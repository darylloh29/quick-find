'use client'

import { useState } from 'react'
import { Card, Input, Button } from '@nextui-org/react'
import SearchIcon from './SearchIcon'

type SearchBarProps = {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!query) return
    onSearch(query)
  }

  return (
    <Card fullWidth radius="none">
      <form
        onSubmit={handleSubmit}
        className="flex p-6 w-full flex-wrap md:flex-nowrap"
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
    </Card>
  )
}
