import { Outlet } from "react-router-dom"
import { useState } from "react"
import Header from "../components/Header"
import FormModal from "../components/FormModal"
import { Container } from "react-bootstrap"


function Layout(props) {
	const [openModal, setOpenModal] = useState(false)
	const [action, setAction] = useState('login')

	const handleClose = () => {
		setOpenModal(false)
	}
	const handleOpenModal = (action) => {
		setOpenModal(true)
		setAction(action)
	}
	return (
		<>
			<FormModal action={action} openModal={openModal} onClose={handleClose} />
			<Header onModalOpen={handleOpenModal} {...props} />
			<Container fluid><Outlet /></Container>
		</>
	)
}

export default Layout