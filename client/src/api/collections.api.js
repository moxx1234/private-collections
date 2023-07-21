import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { sendImage } from './files.api'

export const createCollection = async (data) => {
	const { image, ...rest } = data
	const id = uuidv4()
	if (image) {
		sendImage(image, id)
	}
	const result = await axios.post('/collections/create', { id, ...rest })
		.then(response => {
			return response
		})
		.catch(error => {
			return error.response
		})
	return result
}

export const getAllCollections = async (userId) => {
	return await axios.get('/collections', {
		params: { ID: userId }
	})
		.then((response) => response.data)
		.catch(error => console.log(error))
}

export const getCollection = async (collectionId) => {
	return await axios.get('/collections', {
		params: { ID: collectionId }
	})
		.then(response => response.data)
		.catch(error => console.log(error))
}