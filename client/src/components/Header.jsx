import React from 'react'
import { Button, Container, Form, Nav, Navbar, NavLink } from 'react-bootstrap'
import { BsFillMoonFill, BsBrightnessHighFill } from 'react-icons/bs'
import { LinkContainer } from 'react-router-bootstrap'
import { useThemeContext, useThemeUpdateContext } from '../context/ThemeContext'
import { useUserContext, useUserContextUpdate } from '../context/UserContext'
import { logout } from '../api'

function Header({ onModalOpen }) {
	const theme = useThemeContext()
	const toggleTheme = useThemeUpdateContext()
	const { isLogged } = useUserContext()
	const setUser = useUserContextUpdate()

	const handleLogout = () => {
		logout().then(() => {
			localStorage.removeItem('user')
			setUser(false)
		})
	}
	return (
		<header>
			<Navbar bg="primary" variant={theme} expand="lg">
				<Container fluid>
					<LinkContainer to='/'>
						<Navbar.Brand className="header-text me-auto me-lg-2">Home</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle className="me-2" />
					<button className="theme-btn d-flex align-items-center order-lg-3 py-2 py-lg-0 px-lg-2">
						{
							theme === 'dark' ?
								<BsBrightnessHighFill onClick={toggleTheme} size={20} />
								: <BsFillMoonFill onClick={toggleTheme} size={20} />
						}
					</button>
					<Navbar.Collapse>
						<Form className="d-flex me-auto mt-3 mt-lg-0">
							<Form.Control
								variant={theme}
								type="search"
								placeholder="Search"
								className="me-2 text-input"
								aria-label="Search"
							/>
							<Button variant={`outline-${theme}`}>Search</Button>
						</Form>
						<Nav className="my-2 my-lg-0">
							{
								isLogged ?
									<>
										<LinkContainer to='/profile'>
											<NavLink>Profile</NavLink>
										</LinkContainer>
										<Nav.Link onClick={handleLogout} >Log Out</Nav.Link>
									</> :
									<>
										<Nav.Link onClick={() => onModalOpen('login')} >Login</Nav.Link>
										<Nav.Link onClick={() => onModalOpen('register')} >Sign Up</Nav.Link>
									</>
							}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}

export default Header