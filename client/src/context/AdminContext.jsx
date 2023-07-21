import { createContext, useContext, useState } from "react"

const AdminContext = createContext()
const AdminUpdateContext = createContext()

export const useAdminContext = () => {
	return useContext(AdminContext)
}
export const useAdminUpdateContext = () => {
	return useContext(AdminUpdateContext)
}

const AdminProvider = ({ children }) => {
	const [isAdmin, setIsAdmin] = useState(false)
	const handleAdminChange = (value) => {
		setIsAdmin(value)
	}
	return (
		<AdminContext.Provider value={isAdmin}>
			<AdminUpdateContext.Provider value={handleAdminChange}>
				{children}
			</AdminUpdateContext.Provider>
		</AdminContext.Provider>
	)
}

export default AdminProvider