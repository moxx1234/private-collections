import { User } from './init.js'

export const register = async (userData) => {
	const { email, password } = userData
	const result = await User.create({
		email: email,
		password: password
	}).then((user) => {
		return { status: 200, id: user.id, isAdmin: user.isAdmin, message: 'user created' }
	}).catch(err => {
		if (err.name === 'SequelizeUniqueConstraintError') {
			return { status: 403, message: "User already exists. Please log in!" }
		} else {
			return { status: 500, message: "Something went wrong" }
		}
	})
	return result
}

export const login = async (userData) => {
	const { email, password } = userData
	const result = await User.findOne({
		where: { email: email }
	}).then((user) => {
		if (!user.authenticate(password)) return { status: 401, message: 'Incorrect password! Please try again!' }
		return { status: 200, id: user.id, isAdmin: user.isAdmin, message: `user has logged in` }
	}).catch(() => {
		return { status: 401, message: 'User doesn\'t exist. Please sign up!' }
	})
	return result
}