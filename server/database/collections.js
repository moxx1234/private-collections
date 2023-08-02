import { Op } from "sequelize"
import { Collection, Item } from "./init.js"

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

export const getBiggestCollections = async () => {
	const itemsInCollections = await Item.findAll({
		attributes: ['collectionId']
	}).then(result => result.reduce((result, item) => {
		return { ...result, [item.dataValues.collectionId]: result[item.dataValues.collectionId] ? result[item.dataValues.collectionId] + 1 : 1 }
	}, {})).catch(error => console.log(error))

	const collections = await Collection.findAll({
		attributes: ['id', 'name', 'category'],
		where: {
			[Op.or]: Object.keys(itemsInCollections).map(collectionId => ({ id: collectionId }))
		}
	}).then(result => result.reduce((res, collection) => {
		return [...res, { ...collection.dataValues, itemQty: itemsInCollections[collection.dataValues.id] }]
	}, [])).catch(error => console.log(error))

	collections.sort((a, b) => (b.itemQty - a.itemQty)).splice(5)

	return collections
}

export const getRecentCollections = async () => {
	return await Collection.findAll({
		attributes: ['id', 'name', 'category'],
		order: [['createdAt', 'DESC']],
		limit: 5
	}).then(result => result.map(collection => collection.dataValues))
}