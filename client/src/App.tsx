import { useState } from 'react'
import './App.css'

interface Game {
  id: string
  name: string
  yearpublished?: string
  image?: string
}

function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Game[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setResults(data.slice(0, 10))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Board Games Library</h1>

      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search board games"
          className="border p-2 flex-grow"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}

      <ul>
        {results.map((game) => (
          <li key={game.id} className="flex items-center mb-2">
            {game.image && (
              <img
                src={game.image}
                alt=""
                className="w-12 h-12 object-cover mr-2"
              />
            )}
            <span>{game.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
