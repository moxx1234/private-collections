import './assets/App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import { useState } from 'react'
import Main from './pages/main/Main'
import User from './pages/user/User'
import Collection from "./pages/collection/Collection.jsx"
import { ThemeProvider } from './context/ThemeContext'
import AdminProvider, { useAdminUpdateContext } from './context/AdminContext'
import { logout, defineUser } from './api'

function App() {
	const currentUser = JSON.parse(localStorage.getItem('user'))
	const [isLogged, setIsLogged] = useState(currentUser !== null)
	const setIsAdmin = useAdminUpdateContext

	defineUser().then(data => {
		if (!data) return
		if (data.id === currentUser) return
		localStorage.setItem('user', JSON.stringify(data.id))
		setIsLogged(true)
		setIsAdmin(data.admin)
	})

	const handleLogout = () => {
		logout().then(() => {
			localStorage.removeItem('user')
			setIsLogged(false)
		})
	}
	return (
		<AdminProvider>
			<ThemeProvider>
				<Routes >
					<Route path='/' element={<Layout isLogged={isLogged} onLogout={handleLogout} />}>
						<Route index element={<Main />} />
						<Route path='profile' element={<User id={currentUser} />} />
						<Route path="collection/">
							<Route path=":collectionId" element={<Collection />} />
						</Route>
					</Route>
				</Routes>
			</ThemeProvider>
		</AdminProvider>
	)
}

export default App