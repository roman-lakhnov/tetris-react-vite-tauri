import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import {
	canPlaceBlock,
	checkField,
	createField,
	generateBlock,
	getColor,
	placeBlockOnField,
	removeBlockFromField
} from '../utils'
const GameFieldPage = () => {
	const [field, setField] = useState(createField())
	const clearFieldRef = useRef(createField())
	const startX = 4 // Центр по горизонтали
	const startY = 0 // В верхней части
	const [block, setBlock] = useState({
		point: { x: startX, y: startY },
		shape: generateBlock()
	})
	const blockInUse = useRef(false)
	const pauseRef = useRef(false)
	const [score, setScore] = useState(0)
	const [level, setLevel] = useState(1)
	const [speed, setSpeed] = useState(48)

	// useEffect для размещения блока на поле
	useEffect(() => {
		// console.log('Блок активен, - размещаем...')
		// Используем setField для обновления состояния поля
		clearFieldRef.current = placeBlockOnField(
			clearFieldRef.current,
			block.shape,
			block.point
		)
		setField(clearFieldRef.current)
		// console.log('Блок размещен!')
	}, [block])

	// //каждую секунду координата блока смещаеться на 1 по вертикали
	useEffect(() => {
		const interval = setInterval(() => {
			if (blockInUse.current || pauseRef.current) return
			blockInUse.current = true
			setBlock(prev => {
				let newX = prev.point.x
				let newY = prev.point.y
				newY = prev.point.y + 1
				const newXY = { x: newX, y: newY }
				clearFieldRef.current = removeBlockFromField(
					clearFieldRef.current,
					prev.shape,
					prev.point
				)
				if (canPlaceBlock(clearFieldRef.current, prev.shape, newXY)) {
					// console.log('блок можно двигать вниз')
					return {
						point: newXY,
						shape: prev.shape
					}
				} else {
					// console.log('блок нельзя двигать вниз')
					clearFieldRef.current = placeBlockOnField(
						clearFieldRef.current,
						prev.shape,
						prev.point
					)
					// console.log('блок стал частью поля')
					clearFieldRef.current = checkField(
						clearFieldRef.current,
						setScore,
						setLevel,
						setSpeed
					)
					// console.log('Нет активного блока. Генерируем новый блок...')
					return {
						point: { x: startX, y: startY },
						shape: generateBlock()
					}
				}
			})
			blockInUse.current = false
			// 	//TODO потом когда-то установить нормальное скалирование скорости.
			// }
		}, (speed / 60) * 1000)
		return () => clearInterval(interval)
	}, [speed])

	// Обрабатываем нажатие клавиш
	useEffect(() => {
		const handleKeyDown = event => {
			if (event.key === 'ArrowLeft') handleBlockAction('move', 'left')
			if (event.key === 'ArrowRight') handleBlockAction('move', 'right')
			if (event.key === 'ArrowUp') pauseGame()
			if (event.key === 'ArrowDown') handleBlockAction('move', 'down')
			if (event.key === ' ') handleBlockAction('rotate')
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	})

	const pauseGame = () => {
		pauseRef.current = !pauseRef.current
		toast.clearWaitingQueue()
		toast.dismiss()
		toast(pauseRef.current ? 'Game paused' : 'Game on')
	}

	const handleBlockAction = (action, direction) => {
		if (blockInUse.current || pauseRef.current) return
		blockInUse.current = true
		let newShape = block.shape
		let newPoint = { ...block.point }

		if (action === 'move') {
			// Двигаем блок в зависимости от направления
			if (direction === 'left') newPoint.x -= 1
			if (direction === 'right') newPoint.x += 1
			// if (direction === 'up') newPoint.y -= 1
			if (direction === 'down') newPoint.y += 1
		} else if (action === 'rotate') {
			// Поворачиваем блок
			const size = block.shape.length
			newShape = Array.from({ length: size }, () => Array(size).fill(0))
			for (let i = 0; i < size; i++) {
				for (let j = 0; j < size; j++) {
					newShape[j][size - 1 - i] = block.shape[i][j]
				}
			}
		}

		// Удаляем текущий блок с поля
		clearFieldRef.current = removeBlockFromField(
			clearFieldRef.current,
			block.shape,
			block.point
		)

		// Проверяем, можно ли разместить блок после действия
		if (canPlaceBlock(clearFieldRef.current, newShape, newPoint)) {
			// Если можно, обновляем блок
			setBlock({
				shape: newShape,
				point: newPoint
			})
		}
		blockInUse.current = false
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh'
			}}
		>
			<div className='d-flex gap-3  mt-1 mb-1'>
				<div>
					<p
						className='m-0'
						style={{
							color: 'white',
							fontFamily: "'Press Start 2P', cursive",
							fontSize: '22px',
							textShadow: '1px 1px 2px black'
						}}
					>
						Level: {level}
					</p>
				</div>
				<div>
					<p
						className='m-0'
						style={{
							color: 'white',
							fontFamily: "'Press Start 2P', cursive",
							fontSize: '22px',
							textShadow: '1px 1px 2px black'
						}}
					>
						Score: {score}
					</p>
				</div>
				<div>
					<p
						className='m-0'
						style={{
							color: 'white',
							fontFamily: "'Press Start 2P', cursive",
							fontSize: '22px',
							textShadow: '1px 1px 2px black'
						}}
					>
						Speed: {speed}
					</p>
				</div>

				{/* <div style={{ marginTop: '20px' }}>
							<button
								onClick={() => handleBlockAction('up')}
								style={{ margin: '5px' }}
							>
								⬆ Up
							</button>
							<div>
								<button
									onClick={() => handleBlockAction('left')}
									style={{ margin: '5px' }}
								>
									⬅ Left
								</button>
								<button
									onClick={() => handleBlockAction('right')}
									style={{ margin: '5px' }}
								>
									➡ Right
								</button>
							</div>
							<button
								onClick={() => handleBlockAction('down')}
								style={{ margin: '5px' }}
							>
								⬇ Down
							</button>
						</div> */}
			</div>
			<div
				className='mb-2'
				style={{
					height: '100%',
					aspectRatio: '1 / 2',
					border: '5px solid #717874', // Рамка вокруг таблицы
					borderRadius: '5px' // Скругленные углы для ячеек
				}}
			>
				<table
					style={{
						tableLayout: 'fixed',
						height: '100%',
						borderCollapse: 'collapse',
						aspectRatio: '1 / 2'
					}}
				>
					<tbody>
						{field.map((row, rowIndex) => (
							<tr key={rowIndex}>
								{row.map((cell, cellIndex) => (
									<td
										key={cellIndex}
										style={{
											width: '10%',
											height: `${100 / field.length}%`,
											backgroundImage:
												cell === 0 ? `url("block/0.jpg")` : getColor(cell),
											border: '9px solid #02041d',
											backgroundSize: '100% 100%'
											// backgroundPosition: 'center',
										}}
									/>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default GameFieldPage
