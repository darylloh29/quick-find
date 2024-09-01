import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import { Autocomplete, AutocompleteItem, Button, Card } from '@nextui-org/react'
import SearchIcon from '@components/search/SearchIcon'
import { SearchSuggestionResponse } from '@types'

const MAX_NUMBER_OF_SUGGESTIONS = 6
const MIN_CHARS_FOR_SUGGESTIONS = 3

type SearchBarProps = {
  searchQuery: string
}

type SuggestionItem = {
  key: string
  value: string
}

export default function SearchBar({ searchQuery }: SearchBarProps) {
  const router = useRouter()
  const path = usePathname()

  const [query, setQuery] = useState<string>(searchQuery)
  const [debouncedQuery] = useDebounce(query, 300)

  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([])
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)

  const handleInputChange = (input: string) => {
    setQuery(input)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!query) return
    router.push(path + `?search=${query}`)
  }

  useEffect(() => {
    if (query.length < MIN_CHARS_FOR_SUGGESTIONS) setSuggestions([])
  }, [query])

  useEffect(() => {
    if (debouncedQuery.length < MIN_CHARS_FOR_SUGGESTIONS) return

    const getSearchSuggestions = async () => {
      // Search query to be sent as query params, session token in auth header
      setIsLoadingSuggestions(true)
      const data = await fetch(
        process.env.NEXT_PUBLIC_SEARCH_SUGESSTIONS_ENDPOINT +
          `?search=${searchQuery}`
      )
      const jsonData: SearchSuggestionResponse = await data.json()

      // Assume API returns the most relevant suggestions in order
      setSuggestions(
        jsonData.suggestions
          .slice(0, MAX_NUMBER_OF_SUGGESTIONS)
          .map((suggestion, index) => ({
            key: `${index}`,
            value: suggestion,
          }))
      )
      setIsLoadingSuggestions(false)
    }

    getSearchSuggestions()
  }, [debouncedQuery])

  return (
    <Card fullWidth radius="none">
      <form
        onSubmit={handleSubmit}
        className="flex p-6 w-full flex-wrap md:flex-nowrap"
      >
        <Autocomplete
          aria-label="search"
          placeholder="Type to search..."
          radius="sm"
          items={suggestions}
          inputValue={query}
          onInputChange={handleInputChange}
          menuTrigger="focus"
          isLoading={isLoadingSuggestions}
          autoFocus={true}
          selectorButtonProps={{
            isDisabled: true,
            className: 'absolute right-0',
          }}
          listboxProps={{
            hideSelectedIcon: true,
          }}
          selectorIcon={null}
          allowsCustomValue={true}
        >
          {(suggestion) => {
            return (
              <AutocompleteItem key={suggestion.key}>
                {suggestion.value}
              </AutocompleteItem>
            )
          }}
        </Autocomplete>
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
