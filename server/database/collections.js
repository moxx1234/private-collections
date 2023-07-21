import { Op } from "sequelize"
import { Collection } from "./init.js"

export const createCollection = async (collection) => {
	const { id, name, category, description, additionalInfo, ownerId } = collection
	const result = await Collection.create({
		id,
		name,
		category,
		description,
		additionalInfo: JSON.stringify(additionalInfo),
		ownerId
	}).then(() => {
		return { status: 200, message: 'collection created' }
	}).catch((err) => {
		if (err.name === 'SequelizeUniqueConstraintError') return { status: 409, message: `Collection ${name} already exists` }
		else return { status: 500, message: `collection creation failed ${err}` }
	})
	return result
}

export const getCollections = async (id) => {
	return await Collection.findAll({
		attributes: ['id', 'name', 'category', 'description', 'additionalInfo', 'ownerId'],
		where: {
			[Op.or]: [
				{ id },
				{ ownerId: id }
			]

		}
	})
		.then(result => result.map(collection => collection.dataValues))
		.catch(error => console.log(error))
}