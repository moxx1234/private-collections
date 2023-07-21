import { Sequelize } from 'sequelize'
import useBcrypt from 'sequelize-bcrypt'
const { DataTypes } = Sequelize
import 'dotenv/config'

const sequelize = new Sequelize(process.env.DB_DBNAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	"host": process.env.DB_HOST,
	"dialect": "mysql",
})

export const User = sequelize.define('user', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		unique: 'id'
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: 'email'
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	isAdmin: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	},
	isBlocked: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
})
export const Collection = sequelize.define('collection', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		unique: 'id'
	},
	name: {
		type: DataTypes.STRING,
		unique: 'name',
		allowNull: false,
	},
	category: {
		type: DataTypes.STRING,
		allowNull: false
	},
	description: {
		type: DataTypes.STRING
	},
	additionalInfo: {
		type: DataTypes.STRING
	}
})
export const Item = sequelize.define('item', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		unique: 'id'
	},
	itemName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	itemTags: {
		type: DataTypes.STRING
	},
	additionalInfo: {
		type: DataTypes.STRING
	}
})

User.hasMany(Collection, {
	foreignKey: {
		name: 'ownerId',
		type: DataTypes.UUID,
		allowNull: false,
	}
})
Collection.hasMany(Item, {
	foreignKey: {
		name: 'collectionId',
		type: DataTypes.UUID,
		allowNull: false
	}
})

sequelize.sync({ alter: true }).then(() => {
	console.log('tables had been synchronised')
}).catch((err) => console.log('table sync error', err))

useBcrypt(User, {
	field: 'password',
	rounds: 12,
	compare: 'authenticate'
})

export default sequelize