import { Navigate, useLocation } from "react-router-dom"
import { useUserContext } from "../context/UserContext"

const RequireAuth = ({ children }) => {
	const { isLogged } = useUserContext()
	const location = useLocation()

	if (!isLogged) return <Navigate to='/' state={{ from: location }} />

	return children
}

export default RequireAuth