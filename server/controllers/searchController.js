import { fetchSearchResults } from '../services/boardGameService.js'

export async function searchGames(req, res) {
  const query = req.query.q
  if (!query) {
    return res.status(400).json({ error: 'Missing query' })
  }

  try {
    const games = await fetchSearchResults(query)
    res.json(games)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch data' })
  }
}
