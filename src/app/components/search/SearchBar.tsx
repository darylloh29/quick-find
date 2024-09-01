import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Card, Input, Button } from '@nextui-org/react'
import SearchIcon from './SearchIcon'

type SearchBarProps = {
  searchQuery: string
}

export default function SearchBar({ searchQuery }: SearchBarProps) {
  const router = useRouter()
  const path = usePathname()

  const [query, setQuery] = useState<string>(searchQuery)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!query) return
    router.push(path + `?search=${query}`)
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
          className="flex grow"
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
