import { Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function DataTable({ data }) {
	return (
		<Table striped bordered hover responsive>
			<tbody>
				{data.map(item => (
					<LinkContainer key={item.id} to={`/collection/:${item.id}`}>
						<tr>
							{Object.keys(item).map(property => {
								if (property === 'id') return null
								return <td key={property}>{item[property]}</td>
							})}
						</tr>
					</LinkContainer>
				))}
			</tbody>
		</Table>
	)
}

export default DataTable