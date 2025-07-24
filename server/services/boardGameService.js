import fetch from 'node-fetch'
import { parseStringPromise } from 'xml2js'
import Game from '../models/game.js'

const LIMIT = 24

export async function fetchSearchResults(query) {
  const response = await fetch(
    `https://api.geekdo.com/xmlapi2/search?query=${encodeURIComponent(query)}&type=boardgame`
  )
  const xml = await response.text()
  if (!response.ok) {
    console.error(
      `Error fetching search results: ${response.status} ${response.statusText}`
    )
    console.error(xml)
    throw new Error('Failed to fetch search results')
  }
  const result = await parseStringPromise(xml, { explicitArray: false })
  const items = result.items && result.items.item ? result.items.item : []
  const games = Array.isArray(items) ? items : [items]
  const limited = games.slice(0, LIMIT)

  const ids = limited.map(g => g.$.id)
  let details = {}

  if (ids.length) {
    const detailRes = await fetch(
      `https://api.geekdo.com/xmlapi2/thing?id=${ids.join(',')}`
    )
    const detailXml = await detailRes.text()
    if (!detailRes.ok) {
      console.error(
        `Error fetching game details: ${detailRes.status} ${detailRes.statusText}`
      )
      console.error(detailXml)
      throw new Error('Failed to fetch game details')
    }
    const detailResult = await parseStringPromise(detailXml, { explicitArray: false })
    const detailItems =
      detailResult.items && detailResult.items.item ? detailResult.items.item : []
    const detailList = Array.isArray(detailItems) ? detailItems : [detailItems]
    details = detailList.reduce((acc, item) => {
      const id = item.$.id
      const links = item.link ? (Array.isArray(item.link) ? item.link : [item.link]) : []
      const categories = links
        .filter(l => l.$.type === 'boardgamecategory')
        .map(l => l.$.value)
      acc[id] = {
        image: item.image,
        yearpublished: item.yearpublished?.$.value,
        minage: item.minage?.$.value,
        minplayers: item.minplayers?.$.value,
        maxplayers: item.maxplayers?.$.value,
        categories
      }
      return acc
    }, {})
  }

  return limited.map(
    g =>
      new Game({
        id: g.$.id,
        name: g.name.$.value,
        yearpublished: details[g.$.id]?.yearpublished,
        image: details[g.$.id]?.image,
        minage: details[g.$.id]?.minage,
        minplayers: details[g.$.id]?.minplayers,
        maxplayers: details[g.$.id]?.maxplayers,
        categories: details[g.$.id]?.categories
      })
  )
}
