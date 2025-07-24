import express from 'express'
import cors from 'cors'
import searchRoutes from './routes/searchRoutes.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())

app.use('/api/search', searchRoutes)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
