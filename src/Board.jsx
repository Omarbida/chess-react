import React, { useEffect, useState } from 'react'
import Square from './Square'
import useBoard from './useBoard'
function Board() {
  const boardContext = useBoard()
  const [boardclasses, setBoardClasses] = useState('chess-board white')
  const squares = []
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      squares.push(
        <Square
          key={i * 8 + j}
          className={(i + j + 2) % 2 === 0 ? 'square white' : 'square black'}
          x={i}
          y={j}
        />,
      )
    }
  }
  useEffect(() => {
    if (boardContext.turn === 'white') {
      setTimeout(() => {
        setBoardClasses('chess-board white')
      }, 500)
    } else {
      setTimeout(() => {
        setBoardClasses('chess-board black')
      }, 500)
    }
  }, [boardContext.turn])

  return <div className={boardclasses}>{squares}</div>
}
export default Board
