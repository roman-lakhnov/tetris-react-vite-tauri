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
import BackToMenuBtn from '../components/backToMenuBtn'
import Header from '../components/Header'
import { grey, midnight } from '../constants'
const GameFieldPage = () => {
	const [field, setField] = useState(createField())
	const clearFieldRef = useRef(createField())
	const startX = 4
	const startY = 0
	const [block, setBlock] = useState({
		point: { x: startX, y: startY },
		shape: generateBlock()
	})
	const blockInUse = useRef(false)
	const pauseRef = useRef(false)
	const gameRef = useRef(true)
	const [score, setScore] = useState(0)
	const [level, setLevel] = useState(1)
	const [speed, setSpeed] = useState(48)

	useEffect(() => {
		if (blockInUse.current || pauseRef.current || !gameRef.current) return
		blockInUse.current = true
		if (canPlaceBlock(clearFieldRef.current, block.shape, block.point)) {
			clearFieldRef.current = placeBlockOnField(
				clearFieldRef.current,
				block.shape,
				block.point
			)
			setField(clearFieldRef.current)
		} else {
			gameRef.current = false
			toast.clearWaitingQueue()
			toast.dismiss()
			toast(`Game over!`)
		}
		blockInUse.current = false
	}, [block])
	useEffect(() => {
		const interval = setInterval(() => {
			if (blockInUse.current || pauseRef.current || !gameRef.current) return
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
					return {
						point: newXY,
						shape: prev.shape
					}
				} else {
					clearFieldRef.current = placeBlockOnField(
						clearFieldRef.current,
						prev.shape,
						prev.point
					)
					clearFieldRef.current = checkField(
						clearFieldRef.current,
						setScore,
						setLevel,
						setSpeed
					)
					return {
						point: { x: startX, y: startY },
						shape: generateBlock()
					}
				}
			})
			blockInUse.current = false
		}, (speed / 60) * 1000)
		return () => clearInterval(interval)
	}, [speed])
	useEffect(() => {
		const handleKeyDown = event => {
			if (!gameRef.current) return
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
			if (direction === 'left') newPoint.x -= 1
			if (direction === 'right') newPoint.x += 1
			// if (direction === 'up') newPoint.y -= 1
			if (direction === 'down') newPoint.y += 1
		} else if (action === 'rotate') {
			const size = block.shape.length
			newShape = Array.from({ length: size }, () => Array(size).fill(0))
			for (let i = 0; i < size; i++) {
				for (let j = 0; j < size; j++) {
					newShape[j][size - 1 - i] = block.shape[i][j]
				}
			}
		}
		clearFieldRef.current = removeBlockFromField(
			clearFieldRef.current,
			block.shape,
			block.point
		)
		if (canPlaceBlock(clearFieldRef.current, newShape, newPoint)) {
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
			<BackToMenuBtn />
			<Header score={score} speed={speed} level={level} />
			<div
				style={{
					height: '100%',
					aspectRatio: '1 / 2',
					border: `5px solid ${grey}`,
					borderRadius: '5px'
				}}
			>
				<table
					style={{
						tableLayout: 'fixed',
						height: '100%',
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
											height: `5%`,
											backgroundImage:
												cell === 0 ? `url("block/0.jpg")` : getColor(cell),
											border: `9px solid ${midnight}`,
											backgroundSize: '100% 100%'
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
