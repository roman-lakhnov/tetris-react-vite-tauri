import { useNavigate } from 'react-router-dom'
import { colors, grey } from '../constants'

const MenuPage = () => {
	const navigate = useNavigate()
	return (
		<div className='d-flex flex-column align-items-center justify-content-center vh-100'>
			<div
				className='card shadow-lg p-3'
				style={{
					width: '300px',
					backgroundColor: grey
				}}
			>
				<h1
					className='text-center mb-3'
					style={{
						fontWeight: 'bold',
						fontFamily: 'cursive',
						fontSize: '40px'
					}}
				>
					{['T', 'E', 'T', 'R', 'I', 'S'].map((letter, index) => (
						<span key={index} style={{ color: colors[index], margin: '0 5px' }}>
							{letter}
						</span>
					))}
				</h1>
				<ul className='list-unstyled text-center'>
					<li>
						<button
							className='btn btn-success mb-3 w-100'
							style={{
								fontFamily: 'cursive',
								color: 'white',
								fontSize: '20px',
								boxShadow:
									'0 4px 8px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.2)'
							}}
							onClick={() => navigate('/game')}
						>
							New Game
						</button>
					</li>
					<li>
						<button
							className='btn btn-primary w-100'
							style={{
								fontFamily: 'cursive',
								color: 'white',
								fontSize: '20px',
								boxShadow:
									'0 4px 8px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.2)'
							}}
							onClick={() => navigate('/about')}
						>
							About Game and Creator
						</button>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default MenuPage
