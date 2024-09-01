'use client'

import { useSearchParams } from 'next/navigation'
import SearchBar from './_components/search/SearchBar'
import DocumentsList from './_components/documents/DocumentsList'

export default function Home() {
  const searchParams = useSearchParams()
  const query = searchParams.get('search')

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full">
        <SearchBar searchQuery={query || ''} />
        {query && <DocumentsList searchQuery={query} />}
      </div>
    </main>
  )
}
