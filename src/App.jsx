import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MenuPage from './pages/MenuPage'
import GameFieldPage from './pages/GameFieldPage'
import AboutPage from './pages/AboutPage'
import { ToastContainer } from 'react-toastify'

function App() {
	return (
		<div
			style={{
				backgroundImage: `url("bg/17.png")`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				minHeight: '100vh'
			}}
		>
			<Router>
				<Routes>
					<Route path='/' element={<MenuPage />} />
					<Route path='/game' element={<GameFieldPage />} />
					<Route path='/about' element={<AboutPage />} />
				</Routes>
			</Router>
			<ToastContainer
				limit={1} // Показывает максимум 3 уведомления
				position='top-right'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false} // Удаляет самое старое, когда приходит новое
				closeOnClick
				pauseOnHover
			/>
		</div>
	)
}

export default App
