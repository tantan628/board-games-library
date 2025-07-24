import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import GameList from './components/GameList'
import useSearch from './hooks/useSearch'

function App() {
  const [query, setQuery] = useState('')
  const { results, loading } = useSearch(query)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Board Games Library</h1>

      <div className="mb-4">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {loading && <p>Loading...</p>}

      <GameList games={results} />
    </div>
  )
}

export default App
