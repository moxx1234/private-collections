import { Item } from "./init.js"
import { Op } from "sequelize"

export const createItem = async (item) => {
	return await Item.create(item)
		.then(() => ({ status: 200, message: 'item created' }))
		.catch(err => ({ status: 500, message: `item creation failed ${err}` }))
}

export const getItems = async (id) => {
	return await Item.findAll({
		attributes: ['id', 'itemName', 'itemTags', 'additionalInfo'],
		where: {
			[Op.or]: [{ id }, { collectionId: id }]
		}
	})
		.then(result => result.map(item => item.dataValues))
		.catch(error => console.log(error))
}