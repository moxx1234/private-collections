import axios from "axios"

export const createItem = async (data) => {
	return await axios.post('/items/create', data)
		.then(response => {
			return response
		})
		.catch(error => {
			return error.response
		})
}

export const getAllItems = async (collectionId) => {
	return await axios.get('/items', {
		params: { ID: collectionId }
	})
		.then((response) => response.data)
		.catch(error => console.log(error))
}