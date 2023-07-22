import { createContext, useContext, useState } from "react"

const UserContext = createContext()
const UserContextUpdate = createContext()

export function useUserContext() {
	return useContext(UserContext)
}
export function useUserContextUpdate() {
	return useContext(UserContextUpdate)
}

const UserProvider = ({ children }) => {
	const [user, setUser] = useState({ isLogged: localStorage.getItem('user') !== null, isAdmin: false })
	const handleUserDetermination = (isLogged, isAdmin = false) => {
		setUser(prevState => ({ ...prevState, isLogged, isAdmin }))
	}
	return (
		<UserContext.Provider value={user}>
			<UserContextUpdate.Provider value={handleUserDetermination}>
				{children}
			</UserContextUpdate.Provider>
		</UserContext.Provider>
	)
}

export default UserProvider