import { Form } from "react-bootstrap"

function Textarea({ name, value, onChange, onBlur, touched, error }) {
	return (
		<Form.Control
			className="text-input"
			as='textarea'
			name={name}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
			isInvalid={touched && !!error}
		/>
	)
}

export default Textarea