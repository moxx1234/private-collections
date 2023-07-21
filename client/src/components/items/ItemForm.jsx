import { Formik } from "formik"
import { Button, Container, Form } from 'react-bootstrap'
import * as yup from 'yup'
import { useParams } from "react-router-dom"
import FormGroup from '../FormGroup'
import { createItem } from "../../api"

const setInitialValues = (constantFieldsObject, additionalFieldsObject) => {
	return Object.keys(additionalFieldsObject).reduce((res, name) => {
		if (additionalFieldsObject[name] === 'checkbox') return res = { ...res, [name]: [] }
		if (additionalFieldsObject[name] === 'date') return res = { ...res, [name]: null }
		return res = { ...res, [name]: '' }
	}, { ...constantFieldsObject })
}

const formatDate = (dateObj) => {
	const day = dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : `${dateObj.getDate()}`
	const month = dateObj.getMonth() < 10 ? `0${dateObj.getMonth()}` : `${dateObj.getMonth()}`
	const year = `${dateObj.getFullYear()}`
	return `${year}-${month}-${day}`
}

const formatUserData = (fieldsAndTypes, values) => {
	const checkboxes = Object.entries(fieldsAndTypes).filter(([, type]) => (type === 'checkbox')).map(([name]) => name)
	const dates = Object.entries(fieldsAndTypes).filter(([, type]) => (type === 'date')).map(([name]) => name)
	return Object.entries(values).reduce((result, [name, value]) => {
		const isCheckbox = checkboxes.includes(name)
		const isDate = dates.includes(name)
		if (isCheckbox && !!value.length) return { ...result, [name]: value.join('') }
		if (isDate && !!value) return { ...result, [name]: formatDate(value) }
		if (!isCheckbox && !isDate && !!value) return { ...result, [name]: value }
		return { ...result }
	}, {})
}

function ItemForm({ closeForm, additionalFields }) {
	const { collectionId } = useParams()

	const initialValues = setInitialValues({ itemName: '', itemTags: '' }, additionalFields)

	const schema = yup.object({
		itemName: yup.string().required('Required'),
	})

	const onSubmit = (values, onSubmitProps) => {
		const { itemName, itemTags, ...rest } = values
		const additionalInfo = formatUserData(additionalFields, { ...rest })
		const item = { itemName, itemTags, additionalInfo: JSON.stringify(additionalInfo), collectionId: collectionId.replace(':', '') }
		createItem(item).then(() => {
			onSubmitProps.setSubmitting(false)
			closeForm()
		})
	}

	return (
		<Formik
			validationSchema={schema}
			onSubmit={onSubmit}
			initialValues={initialValues}
		>
			{
				({ handleSubmit, handleChange, handleBlur, values, touched, errors, isSubmitting, setFieldValue }) => {
					return (
						<Container fluid>
							<Form onSubmit={handleSubmit} >
								<FormGroup
									label='Item name'
									value={values.itemName}
									type='text'
									name='itemName'
									onChange={handleChange}
									onBlur={handleBlur}
									error={errors.itemName}
									touched={touched.itemName}
								/>
								<FormGroup
									label='Tags'
									value={values.itemTags}
									type='text'
									name='itemTags'
									onChange={handleChange}
									onBlur={handleBlur}
									error={errors.itemTags}
									touched={touched.itemTags}
								/>
								{
									!!Object.keys(additionalFields).length && Object.entries(additionalFields).map(([name, type]) => {
										return <FormGroup
											key={name}
											label={name}
											value={values[name]}
											type={type}
											name={name}
											onChange={type !== 'date' ? handleChange : setFieldValue}
											onBlur={handleBlur}
											error={errors[name]}
											touched={touched[name]}
										/>
									})
								}
								<Button disabled={isSubmitting} type='submit'>Create Item</Button>
							</Form>
						</Container>
					)
				}
			}
		</Formik >
	)
}

export default ItemForm