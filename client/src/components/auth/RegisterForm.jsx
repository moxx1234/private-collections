import Button from 'react-bootstrap/Button'
import { Formik } from 'formik'
import { Form } from 'react-bootstrap'
import * as yup from 'yup'
import FormGroup from '../FormGroup'
import { register } from '../../api'

function RegisterForm() {

	const initialValues = {
		email: '',
		password: '',
		passwordRepeat: ''
	}

	const schema = yup.object({
		email: yup.string().email('Invalid email').required('Required'),
		password: yup.string().required('Required'),
		passwordRepeat: yup.string().oneOf([yup.ref('password'), ''], 'Passwords don\'t match').required('Required')
	})

	const onSubmit = (values) => {
		register(values).then(() => {
			document.location.reload()
		})
	}
	return (
		<Formik
			validationSchema={schema}
			onSubmit={onSubmit}
			initialValues={initialValues}
		>
			{
				({ handleSubmit, handleChange, handleBlur, values, touched, errors, isSubmitting, isValid }) => {
					return (
						<Form onSubmit={handleSubmit}>
							<FormGroup
								label='Enter your email'
								value={values.email}
								type='text'
								name='email'
								onChange={handleChange}
								onBlur={handleBlur}
								error={errors.email}
								touched={touched.email}
							/>
							<FormGroup
								label='Enter your password'
								value={values.password}
								type='password'
								name='password'
								onChange={handleChange}
								onBlur={handleBlur}
								error={errors.password}
								touched={touched.password}
							/>
							<FormGroup
								label='Repeat the password'
								value={values.passwordRepeat}
								type='password'
								name='passwordRepeat'
								onChange={handleChange}
								onBlur={handleBlur}
								error={errors.passwordRepeat}
								touched={touched.passwordRepeat}
							/>
							<Button type='submit' disabled={isSubmitting || !isValid}>Register</Button>
						</Form>
					)
				}
			}
		</Formik>
	)
}

export default RegisterForm