import Button from 'react-bootstrap/Button'
import { Formik } from 'formik'
import { Form } from 'react-bootstrap'
import * as yup from 'yup'
import FormGroup from '../FormGroup'
import { defineUser, logIn } from '../../api'
import { useUserContextUpdate } from '../../context/UserContext'

function LoginForm({ closeForm }) {
	const setUser = useUserContextUpdate()

	const initialValues = {
		email: '',
		password: ''
	}

	const schema = yup.object({
		email: yup.string().email('Invalid email').required('Required'),
		password: yup.string().required('Required')
	})

	const onSubmit = async (values, onSubmitProps) => {
		const auth = await logIn(values).then(() => {
			closeForm()
			return defineUser()
		})
		setUser(true, auth.isAdmin)
	}

	return (
		<Formik
			validationSchema={schema}
			onSubmit={onSubmit}
			initialValues={initialValues}
		>
			{
				({ isSubmitting, handleSubmit, handleChange, handleBlur, values, touched, errors }) => {
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
							<Button disabled={isSubmitting} type='submit'>Log In</Button>
						</Form>
					)
				}
			}
		</Formik>
	)
}

export default LoginForm