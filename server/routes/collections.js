import express from 'express'
import { createCollection, getCollections } from '../database/collections.js'

const collection = express.Router()

collection.get('/', express.json(), async (req, res) => {
	console.log(req.query.ID)
	const userCollections = await getCollections(req.query.ID)
	res.send(userCollections)
})

collection.post('/create', express.json(), async (req, res) => {
	const { status, message } = await createCollection(req.body)
	res.status(status).send(message)
})

export default collection