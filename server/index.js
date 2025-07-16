import express from 'express'
import fetch from 'node-fetch'
import { parseStringPromise } from 'xml2js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())

app.get('/api/search', async (req, res) => {
  const query = req.query.q
  if (!query) {
    return res.status(400).json({ error: 'Missing query' })
  }
  try {
    const response = await fetch(`https://api.geekdo.com/xmlapi2/search?query=${encodeURIComponent(query)}&type=boardgame`)
    const xml = await response.text()
    const result = await parseStringPromise(xml, { explicitArray: false })
    const items = result.items && result.items.item ? result.items.item : []
    const games = Array.isArray(items) ? items : [items]
    res.json(games.map(g => ({
      id: g.$.id,
      name: g.name.$.value,
      yearpublished: g.yearpublished?.$.value
    })))
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch data' })
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
