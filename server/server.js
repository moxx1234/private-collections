import express from 'express'
import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import createSession from './sessions/session.js'

const app = express()
createSession(app)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const buildFolder = path.join(__dirname, '../client', 'build')
app.use(express.static(buildFolder))

import auth from './routes/auth.js'
import collection from './routes/collections.js'
import item from './routes/items.js'
app.use('/collections', collection)
app.use('/items', item)
app.use('/auth', auth)

app.get("*", (req, res) => {
	res.sendFile(path.join(buildFolder, 'index.html'))
})

const port = process.env.PORT || 3001
app.listen(port, () => {
	console.log(`Server is running on ${port}`)
})