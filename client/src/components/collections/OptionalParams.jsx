import { useState } from 'react'
import { Button, Form, InputGroup, Container } from 'react-bootstrap'
import { BsPlusCircleDotted } from 'react-icons/bs'
import { v4 as uuidv4 } from 'uuid'

const parameterTypes = {
	Numeric: 'number',
	String: 'text',
	Date: 'date',
	'Yes/No': 'checkbox',
	'Multiline text': 'textarea',
}

export const getData = () => {
	const additionalFields = document.querySelectorAll('[data-name="additionalField"]')
	if (!additionalFields) return
	return Array.from(additionalFields).reduce((result, field) => {
		const fieldName = field.value, fieldType = field.getAttribute('data-type')
		if (!fieldName.trim()) return result
		return result = { ...result, [fieldName]: fieldType }
	}, {})
}

function OptionalParams({ value, onChange }) {

	const initialValues = Object.values(parameterTypes).reduce((result, type) => {
		return result = { ...result, [type]: [] }
	}, {})

	const [optionalParameters, setOptionalParameters] = useState(initialValues)

	const addField = (type) => {
		setOptionalParameters(prevState => {
			return { ...prevState, [type]: [...prevState[type], `${uuidv4()}`] }
		})
	}
	const deleteField = (type, id) => {
		setOptionalParameters(prevState => {
			const elIndex = prevState[type].indexOf(id)
			return {
				...prevState,
				[type]: [
					...prevState[type].slice(0, elIndex),
					...prevState[type].slice(elIndex + 1)
				]
			}
		})
	}

	return (
		<Container fluid className='mb-4'>
			<h3 className='mb-3'>Additional item parameters</h3>
			<div className='mb-4'>
				{Object.entries(parameterTypes).map(([label, type]) => (
					<div key={label} className='mb-3 d-flex flex-column align-items-center align-items-lg-start'>
						{optionalParameters[type].length > 0 && optionalParameters[type].map(fieldId => {
							return (
								<InputGroup key={fieldId} className="additional-field mb-2">
									<Form.Control
										placeholder={`Enter name for your ${label} field`}
										className='text-input'
										data-name='additionalField'
										data-type={type}
										onChange={onChange}
										value={value}
									/>
									<Button onClick={() => deleteField(type, fieldId)} variant="outline-danger">Delete</Button>
								</InputGroup>
							)
						})}
						<Button onClick={() => addField(type)} className='col-10 col-sm-5 col-lg'>{label} <BsPlusCircleDotted /></Button>
					</div>
				))}
			</div>
		</Container>
	)
}

export default OptionalParams