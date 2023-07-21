import { Form } from "react-bootstrap"

function TextField({ name, type, value, onChange, onBlur, touched, error }) {
	return (
		<Form.Control
			className="text-input"
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
			isInvalid={touched && !!error}
		/>
	)
}

export default TextField