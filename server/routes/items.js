import express from 'express'
import { createItem, getItems } from '../database/items.js'

const item = express.Router()

item.get('/', express.json(), async (req, res) => {
	const items = await getItems(req.query.ID)
	res.send(items)
})

item.post('/create', express.json(), async (req, res) => {
	const { status, message } = await createItem(req.body)
	res.status(status).send(message)
})

export default item