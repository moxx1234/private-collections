// import io from 'socket.io-client'
import { logIn, logout, register, defineUser } from "./auth.api"
import { createCollection, getAllCollections, getCollection } from './collections.api'
import { createItem, getAllItems, getItem } from './items.api'

// const socket = io(window.location.host, { transports: ['websocket'] })

export {
	logIn,
	logout,
	register,
	defineUser,
	// socket,
	createCollection,
	getAllCollections,
	getCollection,
	createItem,
	getAllItems,
	getItem
}