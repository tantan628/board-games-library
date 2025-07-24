import { Router } from 'express'
import { searchGames } from '../controllers/searchController.js'

const router = Router()

router.get('/', searchGames)

export default router
