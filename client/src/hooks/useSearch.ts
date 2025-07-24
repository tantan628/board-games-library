import { useState, useEffect } from 'react'
import { Game } from '../types/Game'

export default function useSearch(query: string) {
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
        setResults(data.slice(0, 20))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }, 500)

    return () => clearTimeout(handler)
  }, [query])

  return { results, loading }
}
