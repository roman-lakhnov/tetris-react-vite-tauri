const AboutPage = () => {
	return (
		<div className='d-flex flex-column align-items-center justify-content-center vh-100'>
			{/* Карточка с информацией о создателе */}
			<div
				className='card shadow-lg p-4'
				style={{
					width: '40%',
					backgroundColor: '#f8f9fa',
					borderRadius: '10px' // Скругленные углы
				}}
			>
				<h1 className='text-center mb-4'>About the Creator</h1>
				<p className='mb-3'>
					This Tetris game was created by an aspiring developer passionate about
					web development and game design.
				</p>
				<p className='mb-3'>
					The game follows the classic Tetris mechanics with a simple and
					engaging interface.
				</p>
				<a
					href='https://github.com/roman-lakhnov'
					target='_blank'
					rel='noopener noreferrer'
					className='btn btn-dark w-100'
				>
					Visit GitHub
				</a>
			</div>
		</div>
	)
}

export default AboutPage
