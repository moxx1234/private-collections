import { Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useThemeContext } from '../../context/ThemeContext'
import { useEffect, useState } from 'react'

function ItemsTable({ data }) {
	const theme = useThemeContext()
	const [currentData, setCurrentData] = useState(data)
	const [sortBy, setSortBy] = useState({ name: 'none', direction: 'asc' })
	const additionalHeaders = data[0]?.additionalInfo ? Object.keys(data[0].additionalInfo).slice(0, 2) : []

	useEffect(() => {
		setCurrentData(data)
	}, [data])

	const sortNumbers = (a, b, dir) => {
		return dir === 'asc' ? a - b : b - a
	}
	const sortStrings = (a, b, dir) => {
		if (a.toLowerCase() > b.toLowerCase()) return dir === 'asc' ? 1 : -1
		else if (a.toLowerCase() < b.toLowerCase()) return dir === 'asc' ? -1 : 1
		else return 0
	}
	const sortDate = (a, b, dir) => {
		const [yearA, monthA, dayA] = a.split('-')
		const [yearB, monthB, dayB] = b.split('-')
		const dateA = new Date(yearA, monthA, dayA)
		const dateB = new Date(yearB, monthB, dayB)
		return dir === 'asc' ? dateA - dateB : dateB - dateA
	}

	const handleSort = (name) => {
		const sortedData = [...currentData]
		sortedData.sort((a, b) => {
			const parameterA = a[name] || a.additionalInfo[name] || ''
			const parameterB = b[name] || b.additionalInfo[name] || ''
			if (!isNaN(parameterA) && !isNaN(parameterB)) return sortNumbers(parameterA, parameterB, sortBy.direction)
			else if (parameterA.match(/\d{4}-\d{2}-\d{2}/g) && parameterB.match(/\d{4}-\d{2}-\d{2}/g)) return sortDate(parameterA, parameterB, sortBy.direction)
			else return sortStrings(parameterA, parameterB, sortBy.direction)
		})
		setSortBy(prevSort => ({ ...prevSort, direction: prevSort.direction === 'asc' ? 'desc' : 'asc' }))
		setCurrentData(sortedData)
	}

	return (
		<Table variant={theme} striped bordered hover>
			<thead>
				<tr style={{ cursor: 'pointer' }}>
					<th onClick={() => handleSort('itemName')}>Item</th>
					<th onClick={() => handleSort('itemTags')}>Tags</th>
					{additionalHeaders.map(header => (
						<th key={header} onClick={() => handleSort(header)}>{header}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{currentData.map((item, index) => (
					<LinkContainer to={`/item/:${item.id}`} key={item.id}>
						<tr>
							<td>{item.itemName}</td>
							<td>{item.itemTags}</td>
							{additionalHeaders.map((header, index) => {
								const value = item.additionalInfo[header]
								return value ? <td key={index}>{value}</td> : <td key={index}>{''}</td>
							})}
						</tr>
					</LinkContainer>
				))}
			</tbody>
		</Table>
	)
}

export default ItemsTable