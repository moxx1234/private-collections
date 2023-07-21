import session from "express-session"
import 'dotenv/config'
import SequelizeSession from 'express-session-sequelize'
import sequelize from "../database/init.js"

const SessionStore = SequelizeSession(session.Store)

const sequelizeSessionStore = new SessionStore({
	db: sequelize,
})

export const setCookies = (req, userId, isAdmin) => {
	req.session.user = { userId, isAdmin }
}
export const getCookies = (req) => {
	return req.session?.user
}

export const endSession = (req, callback) => {
	req.session.destroy((err) => {
		if (err) return console.error('Error destroying session:', err)
		callback()
	})
}

const createSession = (app) => {
	app.use(session({
		key: 'userId',
		secret: 'super secret',
		store: sequelizeSessionStore,
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 1000 * 60 * 60 * 24, },
	}))
}

export default createSession
