import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

function DateField({ value, onChange, name, onBlur, touched, error }) {
	return (
		<div>
			<DatePicker
				className="text-input"
				name={name}
				selected={value}
				value={value}
				onChange={(value) => onChange(name, value)}
				onBlur={onBlur}
				isInvalid={touched && !!error}
			/>
		</div>
	)
}

export default DateField