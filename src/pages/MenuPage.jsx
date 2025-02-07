import { useNavigate } from 'react-router-dom'

const MenuPage = () => {
	const navigate = useNavigate()
	// Массив цветов для букв
	const letterColors = [
		'#2aa145',
		'#d4ac32',
		'#d37722',
		'#c81c28',
		'#2967a4',
		'#11aaba',
		'#4b4a90'
	]

	return (
		<div className='d-flex flex-column align-items-center justify-content-center vh-100'>
			{/* Карточка с меню */}
			<div
				className='card shadow-lg p-3'
				style={{
					width: '300px',
					backgroundColor: '#717874',
					borderRadius: '20px' // Скругленные углы
				}}
			>
				<h1
					className='text-center mb-3'
					style={{
						fontWeight: 'bold',
						fontFamily: "'Press Start 2P', cursive",
						fontSize: '40px'
					}}
				>
					{['T', 'E', 'T', 'R', 'I', 'S'].map((letter, index) => (
						<span
							key={index}
							style={{ color: letterColors[index], margin: '0 2px' }}
						>
							{letter}
						</span>
					))}
				</h1>
				<ul className='list-unstyled text-center'>
					<li>
						<button
							className='btn mb-3 w-100'
							style={{
								fontFamily: "'Press Start 2P', cursive",
								backgroundColor: '#2aa145', // Зеленый цвет фона
								// border: '2px solid transparent',
								color: 'white',
								// borderImage:
								// 	'linear-gradient(45deg, #4b4a90, #11aaba, #2aa145) 1',
								borderRadius: '10px',
								boxShadow:
									'0 4px 8px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
								transition: 'all 0.3s ease'
							}}
							onMouseEnter={e =>
								(e.currentTarget.style.boxShadow =
									'0 6px 12px rgba(0, 0, 0, 0.4), inset 0 4px 6px rgba(255, 255, 255, 0.4)')
							}
							onMouseLeave={e =>
								(e.currentTarget.style.boxShadow =
									'0 4px 8px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.2)')
							}
							onClick={() => navigate('/game')}
						>
							New Game
						</button>
					</li>
					<li>
						<button
							className='btn mb-3 w-100'
							style={{
								fontFamily: "'Press Start 2P', cursive",
								backgroundColor: '#d4ac32', // Желтый цвет
								// border: '2px solid transparent',
								color: 'white',
								// borderImage:
								// 	'linear-gradient(45deg, #4b4a90, #11aaba, #d4ac32) 1',
								borderRadius: '10px',
								boxShadow:
									'0 4px 8px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
								transition: 'all 0.3s ease'
							}}
							onMouseEnter={e =>
								(e.currentTarget.style.boxShadow =
									'0 6px 12px rgba(0, 0, 0, 0.4), inset 0 4px 6px rgba(255, 255, 255, 0.4)')
							}
							onMouseLeave={e =>
								(e.currentTarget.style.boxShadow =
									'0 4px 8px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.2)')
							}
							onClick={() => navigate('/leaderboard')}
						>
							Leaderboard
						</button>
					</li>

					<li>
						<button
							className='btn w-100'
							style={{
								fontFamily: "'Press Start 2P', cursive",
								backgroundColor: '#2967a4', // Синий цвет
								// border: '2px solid transparent',
								color: 'white',
								// borderImage:
								// 	'linear-gradient(45deg, #c81c28, #d37722, #2967a4) 1',
								borderRadius: '10px',
								boxShadow:
									'0 4px 8px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
								transition: 'all 0.3s ease'
							}}
							onMouseEnter={e =>
								(e.currentTarget.style.boxShadow =
									'0 6px 12px rgba(0, 0, 0, 0.4), inset 0 4px 6px rgba(255, 255, 255, 0.4)')
							}
							onMouseLeave={e =>
								(e.currentTarget.style.boxShadow =
									'0 4px 8px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.2)')
							}
							onClick={() => navigate('/about')}
						>
							About Creator
						</button>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default MenuPage
