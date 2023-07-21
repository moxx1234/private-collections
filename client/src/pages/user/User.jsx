import { useState, useEffect } from 'react'
import { Button, Container } from "react-bootstrap"
import { BsClipboardPlus } from 'react-icons/bs'
import { getAllCollections } from "../../api"
import FormModal from "../../components/FormModal"
import CollectionsTable from "../../components/collections/CollectionsTable"

function User({ id }) {
	const [openModal, setOpenModal] = useState(false)
	const [collections, setCollections] = useState()
	const renderCollections = () => {
		getAllCollections(id).then((collections) => {
			const result = collections.map(collection => {
				const { additionalInfo, ...rest } = collection
				return { ...rest, additionalInfo: JSON.parse(additionalInfo) }
			})
			setCollections(result)
		})
	}

	useEffect(() => {
		renderCollections()
	}, [])

	const handleCloseModal = () => {
		setOpenModal(false)
		renderCollections()
	}

	return (
		<>
			<FormModal action='addCollection' openModal={openModal} onClose={handleCloseModal} />
			<Container fluid className="d-flex justify-content-between align-items-center">
				<h1>Profile</h1>
				<div>
					<Button onClick={() => setOpenModal(true)} variant="primary" className="d-flex align-items-center">
						<span className="d-inline-block pe-2">Add collection</span>
						<BsClipboardPlus />
					</Button>
				</div>
			</Container>
			<Container fluid>
				{
					collections ?
						collections.length ? <CollectionsTable data={collections} /> : <h2>User has no collections yet</h2>
						: <h2>
							loading...
						</h2>
				}
			</Container>
		</>
	)
}

export default User