import { useEffect, useState } from 'react'
import { getItem } from '../../api'
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'

function Item() {
	const [itemData, setItemData] = useState()

	const { itemId } = useParams()

	const renderItemInfo = () => {
		getItem(itemId.replace(':', ''))
			.then((items) => {
				const { additionalInfo, ...rest } = items[0]
				setItemData({ ...rest, additionalInfo: JSON.parse(additionalInfo) })
			})
	}

	useEffect(() => {
		renderItemInfo()
	}, [])

	return (
		itemData ? <Container fluid>
			<h1>Item: <strong>{itemData.itemName}</strong></h1>
			<h2>Tags: <strong>{itemData.itemTags}</strong></h2>
			<div>
				{Object.entries(itemData.additionalInfo).map(([name, value]) => {
					console.log(name)
					return <p>{name}: {value}</p>
				})}
			</div>
		</Container> : <h1>Loading...</h1>
	)
}

export default Item