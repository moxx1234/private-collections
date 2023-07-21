
import { Form } from "react-bootstrap"

function Checkbox({ label, name, onChange }) {
	return (
		<Form.Check
			type="switch"
			name={name}
			label={label}
			onChange={onChange}
		/>
	)
}

export default Checkbox