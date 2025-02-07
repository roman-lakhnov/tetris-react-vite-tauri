import { toast } from 'react-toastify'

export const createField = () => {
	return Array.from({ length: 20 }, () => Array(10).fill(0))
}

export const possibleBlocks = [
	[
		[1, 1],
		[1, 1]
	],
	[
		[0, 2, 0, 0],
		[0, 2, 0, 0],
		[0, 2, 0, 0],
		[0, 2, 0, 0]
	],
	[
		[3, 0, 0],
		[3, 0, 0],
		[3, 3, 0]
	],
	[
		[0, 4, 0],
		[0, 4, 0],
		[4, 4, 0]
	],
	[
		[0, 5, 0],
		[0, 5, 5],
		[0, 5, 0]
	],
	[
		[6, 0, 0],
		[6, 6, 0],
		[0, 6, 0]
	],
	[
		[0, 7, 0],
		[7, 7, 0],
		[7, 0, 0]
	]
]

export const getColor = cell => {
	switch (cell) {
		case 1:
			// 'yellow'
			return `url("block/1.jpg")`
		case 2:
			// 'cyan'
			return `url("block/2.jpg")`
		case 3:
			// 'blue'
			return `url("block/3.jpg")`
		case 4:
			// 'purple'
			return `url("block/4.jpg")`
		case 5:
			// 'orange'
			return `url("block/5.jpg")`
		case 6:
			// 'green'
			return `url("block/6.jpg")`
		case 7:
			// 'red'
			return `url("block/7.jpg")`
		default:
			return
		// 'black'
	}
}

export const generateBlock = () => {
	return possibleBlocks[Math.floor(Math.random() * possibleBlocks.length)]
}

export const canPlaceBlock = (field, block, { x, y }) => {
	// Проходим по каждой ячейке маленькой матрицы
	for (let i = 0; i < block.length; i++) {
		for (let j = 0; j < block[i].length; j++) {
			// Проверяем только ячейки, которые не равны 0
			if (block[i][j] !== 0) {
				const fieldY = y + i
				const fieldX = x + j

				// Проверка выхода за границы большого поля
				if (
					fieldY >= field.length ||
					fieldX >= field[0].length ||
					fieldY < 0 ||
					fieldX < 0
				) {
					return false
				}

				// Проверка на конфликт (ячейка большого поля уже занята)
				if (field[fieldY][fieldX] !== 0) {
					return false
				}
			}
		}
	}

	// Если все проверки пройдены, блок можно разместить
	return true
}

export const placeBlockOnField = (field, block, { x, y }) => {
	const newField = field.map(row => [...row]) // Глубокая копия поля

	// Размещение блока
	for (let i = 0; i < block.length; i++) {
		for (let j = 0; j < block[i].length; j++) {
			if (block[i][j] !== 0) {
				// Проверяем только занятые ячейки блока
				newField[y + i][x + j] = block[i][j] // Размещаем блок на поле
			}
		}
	}

	return newField
}

export const removeBlockFromField = (field, block, { x, y }) => {
	const newField = field.map(row => [...row]) // Глубокая копия поля
	// Удаление блока
	for (let i = 0; i < block.length; i++) {
		for (let j = 0; j < block[i].length; j++) {
			if (block[i][j] !== 0) {
				if (newField[y + i][x + j]) {
					// Проверяем только занятые ячейки блока
					newField[y + i][x + j] = 0 // Убираем блок, ставим 0
				}
			}
		}
	}

	return newField
}

export const checkField = (field, setScore, setLevel, setSpeed) => {
	const newField = field.filter(row => row.some(cell => cell === 0)) // Удаляем полностью заполненные строки
	const rowsToAdd = field.length - newField.length // Количество удалённых строк
	const emptyRows = Array(rowsToAdd).fill(Array(field[0].length).fill(0)) // Создаём пустые строки

	// Обновляем счет
	if (rowsToAdd > 0) {
		setScore(prevScore => {
			toast.clearWaitingQueue()
			toast.dismiss()
			toast(`Row x${rowsToAdd}`)
			let newScore = prevScore + rowsToAdd
			// Обновление уровня при достижении определенного порога очков

			// Пример: уровень увеличивается каждые 10 очков
			setLevel(prev => {
				let newLevel = Math.ceil((newScore + 1) / 10)
				if (prev == newLevel) {
					return prev
				} else {
					toast.clearWaitingQueue()
					toast.dismiss()
					toast(`Level up!`)
					return newLevel
				}
			})

			setSpeed(48 - Math.ceil((newScore + 1) / 10) * 5)

			return newScore
		})

		// Обновление скорости в зависимости от уровня
	}

	return [...emptyRows, ...newField] // Добавляем пустые строки сверху
}
