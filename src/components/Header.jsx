// eslint-disable-next-line react/prop-types
const Header = ({ score, speed, level }) => {
	return (
		<div className='d-flex gap-4 mt-2 mb-2'>
			<p
				className='m-0'
				style={{
					color: 'white',
					fontFamily: "'Press Start 2P', cursive",
					fontSize: '25px',
					textShadow: '1px 1px 2px black'
				}}
			>
				Level: {level}
			</p>
			<p
				className='m-0'
				style={{
					color: 'white',
					fontFamily: "'Press Start 2P', cursive",
					fontSize: '25px',
					textShadow: '1px 1px 2px black'
				}}
			>
				Score: {score}
			</p>

			<p
				className='m-0'
				style={{
					color: 'white',
					fontFamily: "'Press Start 2P', cursive",
					fontSize: '25px',
					textShadow: '1px 1px 2px black'
				}}
			>
				Speed: {speed}
			</p>
		</div>
	)
}

export default Header
