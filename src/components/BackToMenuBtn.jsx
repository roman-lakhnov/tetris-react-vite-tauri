import { useNavigate } from 'react-router-dom'

const BackToMenuBtn = () => {
	const navigate = useNavigate()
	return (
		<button
			className='btn btn-secondary'
			style={{
				fontFamily: 'cursive',
				position: 'absolute',
				top: '5px',
				left: '5px',
				color: 'white',
        fontSize: '20px',
				boxShadow:
					'0 4px 8px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.2)'
			}}
			onClick={() => navigate('/')}
		>
			⬅
		</button>
	)
}

export default BackToMenuBtn
