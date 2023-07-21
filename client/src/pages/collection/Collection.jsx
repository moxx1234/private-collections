import { useEffect, useState } from "react"
import { Container, Button } from "react-bootstrap"
import { useParams } from "react-router-dom"
import ReactQuill from "react-quill"
import { BsClipboardPlus } from "react-icons/bs"
import { getAllItems, getCollection } from "../../api"
import FormModal from "../../components/FormModal"
import ItemsTable from "../../components/items/ItemsTable"

function Collection() {
	const [collectionData, setCollectionData] = useState()
	const [items, setItems] = useState()
	const [isOwner, setIsOwner] = useState(false)
	const [openModal, setOpenModal] = useState(false)

	const { collectionId } = useParams()

	const renderCollectionInfo = () => {
		getCollection(collectionId.replace(':', ''))
			.then((collections) => {
				const { additionalInfo, ...rest } = collections[0]
				setCollectionData({ ...rest, additionalInfo: JSON.parse(additionalInfo) })
				const { ownerId } = rest
				setIsOwner(ownerId === JSON.parse(localStorage.getItem('user')))
			})
	}
	const defineCollectionItems = () => {
		getAllItems(collectionId.replace(':', ''))
			.then(items => {
				setItems(items)
			})
	}

	useEffect(() => {
		renderCollectionInfo()
		defineCollectionItems()
	}, [])

	const handleOpenModal = () => {
		setOpenModal(true)
	}

	return (
		collectionData ?
			<Container fluid>
				<h1>Collection: <strong>{collectionData.name}</strong></h1>
				<h2>Category: <strong>{collectionData.category}</strong></h2>
				<h2>Description:</h2>
				{
					collectionData.description ?
						<ReactQuill
							value={collectionData.description}
							theme="bubble"
							readOnly
						/>
						: <p>no description :(</p>
				}
				{
					isOwner && <>
						<FormModal action='addItem' openModal={openModal} additionalFields={collectionData.additionalInfo} onClose={() => setOpenModal(false)} />
						<Button onClick={handleOpenModal} variant="primary" className="d-flex align-items-center">
							<span className="d-inline-block pe-2">Add item</span>
							<BsClipboardPlus />
						</Button>
						{items && <ItemsTable data={items} />}
					</>
				}
			</Container>
			: <h1>Loading...</h1>
	)
}

export default Collection