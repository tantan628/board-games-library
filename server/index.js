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
    const response = await fetch(
      `https://api.geekdo.com/xmlapi2/search?query=${encodeURIComponent(query)}&type=boardgame`
    )
    const xml = await response.text()
    const result = await parseStringPromise(xml, { explicitArray: false })
    const items = result.items && result.items.item ? result.items.item : []
    const games = Array.isArray(items) ? items : [items]

    const limited = games.slice(0, 10)
    const ids = limited.map(g => g.$.id)
    let images = {}

    if (ids.length) {
      const detailRes = await fetch(
        `https://api.geekdo.com/xmlapi2/thing?id=${ids.join(',')}`
      )
      const detailXml = await detailRes.text()
      const detailResult = await parseStringPromise(detailXml, {
        explicitArray: false
      })
      const detailItems =
        detailResult.items && detailResult.items.item
          ? detailResult.items.item
          : []
      const detailList = Array.isArray(detailItems) ? detailItems : [detailItems]
      images = detailList.reduce((acc, item) => {
        acc[item.$.id] = item.image
        return acc
      }, {})
    }

    res.json(
      limited.map(g => ({
        id: g.$.id,
        name: g.name.$.value,
        yearpublished: g.yearpublished?.$.value,
        image: images[g.$.id]
      }))
    )
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch data' })
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
