import { useState } from 'react'
import { Button, Container, Row, Col, Form } from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'
import FormGroup from '../FormGroup'
import OptionalParams, { getData } from './OptionalParams'
import { createCollection } from '../../api'

function CollectionForm({ closeForm }) {
	const [editorValue, setEditorValue] = useState()
	const [formImage, setFormImage] = useState()
	const initialValues = {
		name: '',
		category: '',
	}

	const schema = yup.object({
		name: yup.string().required('Required'),
		category: yup.string().required('Required'),
	})
	const handleEditorChange = (value) => {
		setEditorValue(value)
	}
	const handleImageInput = ({ target }) => {
		setFormImage(target.files[0])
	}
	const onSubmit = (values, onSubmitProps) => {
		const userInput = {
			...values,
			description: editorValue ? editorValue : null,
			additionalInfo: getData(),
			image: formImage ? formImage : null,
			ownerId: JSON.parse(localStorage.getItem('user'))
		}
		createCollection(userInput).then((response) => {
			onSubmitProps.setSubmitting(false)
			if (response.status === 409) return onSubmitProps.setFieldError('name', response.data)
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
				({ handleSubmit, handleChange, handleBlur, values, touched, errors, isSubmitting }) => {
					return (
						<Container fluid>
							<Form onSubmit={handleSubmit} >
								<Row className="mb-4">
									<Col sm>
										<FormGroup
											label='Collection name'
											value={values.name}
											type='text'
											name='name'
											onChange={handleChange}
											onBlur={handleBlur}
											error={errors.name}
											touched={touched.name}
										/>
									</Col>
									<Col sm>
										<FormGroup
											label='Category'
											value={values.category}
											type='text'
											name='category'
											onChange={handleChange}
											onBlur={handleBlur}
											error={errors.category}
											touched={touched.category}
										/>
									</Col>
								</Row>
								<Row className="mb-4">
									<FormGroup
										label='Description'
										value={editorValue}
										type='editor'
										name='description'
										onChange={handleEditorChange}
									/>
								</Row>
								<Form.Group className="mb-4">
									<Form.Label>Upload collection image</Form.Label>
									<Form.Control type='file' accept='image/*' onChange={handleImageInput} />
								</Form.Group>
								<OptionalParams />
								<Button disabled={isSubmitting} type='submit'>Create Collection</Button>
							</Form>
						</Container>
					)
				}
			}
		</Formik >
	)
}

export default CollectionForm