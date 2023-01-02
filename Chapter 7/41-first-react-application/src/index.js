import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

const root = createRoot(document.querySelector('#root'))

root.render(
	<div>
		<App clickersCount={ 3 }>
			<h1>My First React App</h1>
			<h2>Hello Mate</h2>
		</App>
		
	</div>
)