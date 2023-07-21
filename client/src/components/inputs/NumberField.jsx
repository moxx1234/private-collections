import { Form } from "react-bootstrap"

function NumberField({ name, value, onChange, onBlur, touched, error }) {
	return (
		<Form.Control
			className="text-input"
			type='text'
			name={name}
			value={value.replace(/[^\d]/g, '')}
			onChange={onChange}
			onBlur={onBlur}
			isInvalid={touched && !!error}
		/>
	)
}

export default NumberField