import BackToMenuBtn from '../components/backToMenuBtn'
const AboutPage = () => {
	//TODO  правила.
	return (
		<div>
			<BackToMenuBtn />
			<div className='d-flex flex-column align-items-center justify-content-center vh-100'>
				<div
					className='card shadow-lg p-3'
					style={{
						width: '500px',
						backgroundColor: '#f8f9fa'
					}}
				>
					<h1
						style={{
							fontWeight: 'bold',
							fontFamily: 'cursive',
							fontSize: '35px'
						}}
						className='text-center mb-4'
					>
						About Game and Creator
					</h1>
					<p
						style={{
							fontFamily: 'cursive'
						}}
						className='mb-3'
					>
						Tetris is a classic arcade game where the player controls falling
						tetrominoes (geometric shapes) made up of four square blocks. The
						objective of the game is to fill horizontal lines on the game field
						without leaving any empty spaces. When a line is completely filled,
						it disappears, and the player earns points. The controls are as
						follows: the arrow keys left and right move the tetromino, the down
						arrow speeds up its fall, the spacebar rotates the shape, and the up
						arrow pauses the game.
					</p>
					<p
						style={{
							fontFamily: 'cursive'
						}}
						className='mb-3'
					>
						This Tetris game was created by a passionate developer interested in
						web development and game design. It is built using JavaScript,
						React, HTML, and CSS to create an interactive and responsive user
						interface. Tauri was used to package the game, allowing it to be
						compiled into a native Windows executable, in addition to being
						deployable as a web application. This makes the game versatile, as
						it can be accessed through a browser or run offline as a standalone
						app. You can check out the developer’s work on GitHub.
					</p>
					<a
						style={{
							fontFamily: 'cursive',
							fontSize: '20px'
						}}
						href='https://github.com/roman-lakhnov/tetris-react-vite-tauri'
						target='_blank'
						rel='noopener noreferrer'
						className='btn btn-dark w-100'
					>
						Visit GitHub
					</a>
				</div>
			</div>
		</div>
	)
}

export default AboutPage
