import axios from 'axios'

axios.defaults.withCredentials = true

export const logIn = async (userInputs) => {
	return await axios({
		method: 'post',
		url: `/auth/login`,
		data: userInputs
	}).then((response) => {
		return response
	}).catch(error => alert(error.response.data.message))
}

export const register = async (userInputs) => {
	const { passwordRepeat, ...rest } = userInputs
	await axios({
		method: 'post',
		url: `/auth/register`,
		data: rest
	}).then(result => {
		return result
	}).catch(error => alert(error.response.data.message))
}

export const logout = async () => {
	await axios.post(`/auth/logout`).then((response) => {
		return response
	})
}

export const defineUser = async () => {
	return await axios.get(`/auth/login`).then((response) => {
		return response.data
	})
}