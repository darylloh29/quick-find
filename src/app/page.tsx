import SearchBar from './components/SearchBar/SearchBar'
import DocumentsList from './components/DocumentsList/DocumentsList'

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full">
        <SearchBar />
        <DocumentsList />
      </div>
    </main>
  )
}
