import { Outlet } from "react-router-dom"
import { useState } from "react"
import Header from "../components/Header"
import FormModal from "../components/FormModal"


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
			<main><Outlet /></main>
		</>
	)
}

export default Layout