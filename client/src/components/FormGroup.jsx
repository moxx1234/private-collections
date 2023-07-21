import { Form } from "react-bootstrap"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import InputField from "./inputs/InputField"

function FormGroup(props) {

	return (
		<Form.Group className="mb-3">
			{props.type !== 'checkbox' && <Form.Label>{props.label}</Form.Label>}
			{
				props.type === 'editor' ?
					<ReactQuill
						theme="snow"
						value={props.value}
						onChange={props.onChange}
						className="text-input"
					/>
					: <InputField {...props} />
			}
			<Form.Control.Feedback type='invalid'>{props.error}</Form.Control.Feedback>
		</Form.Group>
	)
}

export default FormGroup