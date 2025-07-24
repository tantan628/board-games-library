import { useState, useEffect } from 'react'
import './App.css'

interface Game {
  id: string
  name: string
  yearpublished?: string
  image?: string
  minage?: string
  minplayers?: string
  maxplayers?: string
  categories?: string[]
}

function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Game[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const handler = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data.slice(0, 24))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }, 500)

    return () => clearTimeout(handler)
  }, [query])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Board Games Library</h1>

      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search board games"
          className="border p-2 w-full"
        />
      </div>

      {loading && <p>Loading...</p>}

      <ul>
        {results.map(game => (
          <li key={game.id} className="flex items-start mb-4">
            {game.image && (
              <img
                src={game.image}
                alt={game.name}
                className="w-16 h-16 object-cover mr-4"
              />
            )}
            <div>
              <div className="font-semibold">
                {game.name} {game.yearpublished && `(${game.yearpublished})`}
              </div>
              {game.minage && (
                <div className="text-sm text-gray-600">Age: {game.minage}+</div>
              )}
              {game.minplayers && game.maxplayers && (
                <div className="text-sm text-gray-600">
                  Players: {game.minplayers}-{game.maxplayers}
                </div>
              )}
              {game.categories && game.categories.length > 0 && (
                <div className="text-sm text-gray-600">
                  Genres: {game.categories.join(', ')}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
