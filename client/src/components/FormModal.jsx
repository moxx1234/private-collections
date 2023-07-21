import { useThemeContext } from '../context/ThemeContext'
import { Modal } from 'react-bootstrap'
import LoginForm from './auth/LoginForm'
import RegisterForm from './auth/RegisterForm'
import CollectionForm from './collections/CollectionForm'
import ItemForm from './items/ItemForm'

function FormModal({ openModal, onClose, action, additionalFields = null }) {
	const theme = useThemeContext()

	const actions = {
		login: {
			title: 'Login',
			component: <LoginForm closeForm={onClose} />
		},
		register: {
			title: 'Register',
			component: <RegisterForm closeForm={onClose} />
		},
		addCollection: {
			title: 'Add Collection',
			component: <CollectionForm closeForm={onClose} />
		},
		addItem: {
			title: 'Add Item',
			component: <ItemForm closeForm={onClose} additionalFields={additionalFields} />
		}
	}

	return (
		<Modal show={openModal} onHide={onClose} aria-labelledby="contained-modal-title-vcenter" centered fullscreen={action === 'addCollection'}>
			{
				theme === 'dark' ?
					<Modal.Header closeButton closeVariant='white'>
						<Modal.Title>{actions[action].title}</Modal.Title>
					</Modal.Header>
					:
					<Modal.Header closeButton>
						<Modal.Title>{actions[action].title}</Modal.Title>
					</Modal.Header>
			}
			<Modal.Body>
				{actions[action].component}
			</Modal.Body>
		</Modal>
	)
}

export default FormModal