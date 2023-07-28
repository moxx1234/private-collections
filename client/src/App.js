import './assets/App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import Main from './pages/main/Main'
import User from './pages/user/User'
import Collection from "./pages/collection/Collection.jsx"
import { ThemeProvider } from './context/ThemeContext'
import { useUserContextUpdate } from './context/UserContext'
import { defineUser } from './api'
import RequireAuth from './hoc/RequireAuth'
import Item from './pages/item/Item'

function App() {
	const currentUser = JSON.parse(localStorage.getItem('user'))
	const setUser = useUserContextUpdate()

	defineUser().then(data => {
		if (!data) return
		if (data.id === currentUser) return
		localStorage.setItem('user', JSON.stringify(data.id))
		setUser(true, data.admin)
	})

	return (
		<ThemeProvider>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Main />} />
					<Route path='profile' element={
						<RequireAuth>
							<User />
						</RequireAuth>
					} />
					<Route path='user/:userId' element={<User />} />
					<Route path="collection/">
						<Route path=":collectionId" element={<Collection />} />
					</Route>
					<Route path='item/'>
						<Route path=':itemId' element={<Item />} />
					</Route>
				</Route>
			</Routes>
		</ThemeProvider>
	)
}

export default App