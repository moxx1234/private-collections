import { Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useThemeContext } from '../../context/ThemeContext'

function CollectionsTable({ data }) {
	const theme = useThemeContext()
	return (
		<Table variant={theme} striped bordered hover>
			<thead>
				<tr>
					<th>#</th>
					<th>Collection</th>
				</tr>
			</thead>
			<tbody>
				{data.map((item, index) => (
					<LinkContainer to={`/collection/:${item.id}`} key={item.id}>
						<tr>
							<td>{index + 1}</td>
							<td>{item.name}</td>
						</tr>
					</LinkContainer>
				))}
			</tbody>
		</Table>
	)
}

export default CollectionsTable