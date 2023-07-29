import { Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useThemeContext } from '../../context/ThemeContext'
import { useEffect, useState } from 'react'
import { BsCaretDown, BsCaretUp } from 'react-icons/bs'

function ItemsTable({ data, headers }) {
	const theme = useThemeContext()
	const [currentData, setCurrentData] = useState(data)
	const [sortBy, setSortBy] = useState({ name: 'none', direction: 'asc' })
	const additionalHeaders = data[0]?.additionalInfo ? Object.keys(data[0].additionalInfo) : []

	useEffect(() => {
		setCurrentData([...data])
	}, [data])

	const sortItems = (items, column, direction) => {
		items.sort((a, b) => {
			const parameterA = a[column] || a.additionalInfo[column] || ''
			const parameterB = b[column] || b.additionalInfo[column] || ''
			if (!isNaN(parameterA) && !isNaN(parameterB)) return sortNumbers(parameterA, parameterB, direction)
			else if (parameterA.match(/\d{4}-\d{2}-\d{2}/g) && parameterB.match(/\d{4}-\d{2}-\d{2}/g)) return sortDate(parameterA, parameterB, direction)
			else return sortStrings(parameterA, parameterB, direction)
		})
		return items
	}
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

	const renderArrow = (selectedSort, currentColumn) => {
		if (selectedSort.name === currentColumn) {
			return selectedSort.direction === 'asc' ? <BsCaretDown /> : <BsCaretUp />
		} else return null
	}

	const handleSort = (name) => {
		if (sortBy.name === name) {
			setSortBy((prevSort) => ({ ...prevSort, direction: prevSort.direction === 'asc' ? 'desc' : 'asc' }))
		}
		else {
			setSortBy({ name, direction: 'asc' })
		}
	}

	const sortedData = sortItems(currentData, sortBy.name, sortBy.direction)

	return (
		<Table variant={theme} striped bordered hover responsive>
			<thead>
				<tr style={{ cursor: 'pointer' }}>
					<th onClick={() => handleSort('itemName')}>Item {renderArrow(sortBy, 'itemName')}</th>
					<th onClick={() => handleSort('itemTags')}>Tags {renderArrow(sortBy, 'itemTags')}</th>
					{headers.map(header => (
						<th key={header} onClick={() => handleSort(header)}>{header} {renderArrow(sortBy, header)}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{sortedData.map((item) => (
					<LinkContainer to={`/item/:${item.id}`} key={item.id}>
						<tr>
							<td>{item.itemName}</td>
							<td>{item.itemTags}</td>
							{headers.map((header) => {
								const value = item.additionalInfo[header]
								return value ? <td key={header}>{value}</td> : <td key={header}>{''}</td>
							})}
						</tr>
					</LinkContainer>
				))}
			</tbody>
		</Table>
	)
}

export default ItemsTable