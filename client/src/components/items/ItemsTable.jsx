import { Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useThemeContext } from '../../context/ThemeContext'

function ItemsTable({ data }) {
	const theme = useThemeContext()
	return (
		<Table variant={theme} striped bordered hover>
			<thead>
				<tr>
					<th>Item</th>
					<th>Tags</th>
				</tr>
			</thead>
			<tbody>
				{data.map((item, index) => (

					<LinkContainer to={`/item/:${item.id}`} key={item.id}>
						<tr>
							<td>{item.itemName}</td>
							<td>{item.itemTags}</td>
						</tr>
					</LinkContainer>
				))}
			</tbody>
		</Table>
	)
}

export default ItemsTable