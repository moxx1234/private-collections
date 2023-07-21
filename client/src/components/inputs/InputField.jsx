import Checkbox from "./Checkbox"
import DateField from "./DateField"
import NumberField from "./NumberField"
import TextField from "./TextField"
import Textarea from "./Textarea"

function InputField(props) {
	const { type } = props

	switch (type) {
		case 'text': return <TextField {...props} />
		case 'password': return <TextField {...props} />
		case 'number': return <NumberField {...props} />
		case 'date': return <DateField {...props} />
		case 'checkbox': return <Checkbox {...props} />
		case 'textarea': return <Textarea {...props} />
		default: throw new Error('unknown field type')
	}
}

export default InputField