import express from 'express'
import { createCollection, getBiggestCollections, getCollections, getRecentCollections } from '../database/collections.js'

const collection = express.Router()

collection.get('/', express.json(), async (req, res) => {
	const userCollections = await getCollections(req.query.ID)
	res.send(userCollections)
})

collection.post('/create', express.json(), async (req, res) => {
	const { status, message } = await createCollection(req.body)
	res.status(status).send(message)
})

collection.get('/biggest', async (req, res) => {
	const collections = await getBiggestCollections()
	res.send(collections)
})

collection.get('/recent', async (req, res) => {
	const collections = await getRecentCollections()
	res.send(collections)
})

export default collection