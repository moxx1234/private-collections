import express from 'express'
import { register, login } from '../database/auth.js'
import { endSession, getCookies, setCookies } from '../sessions/session.js'

const actions = ['login', 'register']

const router = express.Router()

actions.forEach(action => {
	router.post(`/${action}`, express.json(), async (req, res) => {
		const { status, id, isAdmin, message } = action === 'login' ? await login(req.body, res) : await register(req.body, res)
		if (status !== 200) return res.status(status).json({ message: message })
		setCookies(req, id, isAdmin)
		res.json({ message: message })
	})
})

router.get('/login', express.json(), (req, res) => {
	const user = getCookies(req)
	if (user) {
		res.json({ id: user.userId, admin: user.isAdmin })
	} else {
		res.json(null)
	}
})

router.post('/logout', express.json(), (req, res) => {
	endSession(req, (err) => {
		if (err) {
			console.error('Error ending session:', err)
			return res.status(500).json({ error: 'Failed to end session' })
		}
		res.json('Session ended')
	})
})

export default router