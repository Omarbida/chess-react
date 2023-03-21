import React, { createContext, useCallback, useEffect, useState } from 'react'

export const BoardContext = createContext({
  board: [],
  turn: 'white',
  selectedSquare: null,
  turn: 'white',
  posibleMoves: [],
  selectSquare: () => {},
  checkPosibleMoves: () => {},
})
export const BoardProvider = ({ children }) => {
  const [selectedSquare, setSelectedSquare] = useState(null)
  const [turn, setTurn] = useState('white')
  const [posibleMoves, setPosibleMoves] = useState([])
  const [board, setBoard] = useState([
    [
      { piece: 'BR', player: 'black' },
      { piece: 'BN', player: 'black' },
      { piece: 'BB', player: 'black' },
      { piece: 'BQ', player: 'black' },
      { piece: 'BK', player: 'black' },
      { piece: 'BB', player: 'black' },
      { piece: 'BN', player: 'black' },
      { piece: 'BR', player: 'black' },
    ],
    [
      { piece: 'BP', player: 'black' },
      { piece: 'BP', player: 'black' },
      { piece: 'BP', player: 'black' },
      { piece: 'BP', player: 'black' },
      { piece: 'BP', player: 'black' },
      { piece: 'BP', player: 'black' },
      { piece: 'BP', player: 'black' },
      { piece: 'BP', player: 'black' },
    ],
    [
      { piece: '', player: '' },
      { piece: '', player: '' },
      { piece: '', player: '' },
      { piece: '', player: '' },
      { piece: '', player: '' },
      { piece: '', player: '' },
      { piece: '', player: '' },
      { piece: '', player: '' },
    ],
    [
      { piece: '', player: '' },
      { piece: '', player: '' },
      { piece: '', player: '' },
      { piece: '', player: '' },
      { piece: '', player: '' },
      { piece: '', player: '' },
      { piece: '', player: '' },
      { piece: '', player: '' },
    ],
    [
      { piece: '', player: '' },
      { piece: '', player: '' },
      { piece: '', player: '' },
      { piece: '', player: '' },
      { piece: '', player: '' },
      { piece: '', player: '' },
      { piece: '', player: '' },
      { piece: '', player: '' },
    ],
    [
      { piece: '', player: '' },
      { piece: '', player: '' },
      { piece: '', player: '' },
      { piece: '', player: '' },
      { piece: '', player: '' },
      { piece: '', player: '' },
      { piece: '', player: '' },
      { piece: '', player: '' },
    ],
    [
      { piece: 'WP', player: 'white' },
      { piece: 'WP', player: 'white' },
      { piece: 'WP', player: 'white' },
      { piece: 'WP', player: 'white' },
      { piece: 'WP', player: 'white' },
      { piece: 'WP', player: 'white' },
      { piece: 'WP', player: 'white' },
      { piece: 'WP', player: 'white' },
    ],
    [
      { piece: 'WR', player: 'white' },
      { piece: 'WN', player: 'white' },
      { piece: 'WB', player: 'white' },
      { piece: 'WQ', player: 'white' },
      { piece: 'WK', player: 'white' },
      { piece: 'WB', player: 'white' },
      { piece: 'WN', player: 'white' },
      { piece: 'WR', player: 'white' },
    ],
  ])
  const [selectMove, setSelectMove] = useState('select')
  const click = useCallback(
    (x, y, piece, player) => {
      if (selectMove === 'select') {
        setSelectedSquare({ x, y, piece, player })
        checkPosibleMoves(x, y, piece, player)
        setSelectMove('move')
      } else if (selectMove === 'move') {
        if (posibleMoves.some((move) => move.x === x && move.y === y)) {
          const newBoard = [...board]
          newBoard[selectedSquare.x][selectedSquare.y].piece = ''
          newBoard[selectedSquare.x][selectedSquare.y].player = ''
          newBoard[x][y].piece = selectedSquare.piece
          newBoard[x][y].player = selectedSquare.player
          setBoard(newBoard)
          setSelectedSquare(null)
          setPosibleMoves([])
          setSelectMove('select')
          setTurn(turn === 'white' ? 'black' : 'white')
        } else {
          setSelectedSquare({ x, y, piece, player })
          checkPosibleMoves(x, y, piece, player)
          setSelectMove('move')
        }
      }
    },
    [board, posibleMoves, selectMove, selectedSquare, turn],
  )

  const checkPosibleMoves = useCallback(
    (x, y, piece, player) => {
      let moves = []
      if (!piece) return setPosibleMoves([])
      if (player !== turn) return setPosibleMoves([])

      switch (piece) {
        case 'WP':
          if (board[x - 1]?.[y]?.piece === '') {
            moves.push({ x: x - 1, y, type: 'move' })
          }
          if (x === 6 && board[x - 2]?.[y]?.piece === '') {
            moves.push({ x: x - 2, y, type: 'move' })
          }
          if (board[x - 1]?.[y - 1]?.player === 'black') {
            moves.push({ x: x - 1, y: y - 1, type: 'attack' })
          }
          if (board[x - 1]?.[y + 1]?.player === 'black') {
            moves.push({ x: x - 1, y: y + 1, type: 'attack' })
          }
          break
        case 'BP':
          if (board[x + 1]?.[y]?.piece === '') {
            moves.push({ x: x + 1, y, type: 'move' })
          }
          if (x === 1 && board[x + 2]?.[y]?.piece === '') {
            moves.push({ x: x + 2, y, type: 'move' })
          }
          if (board[x + 1]?.[y - 1]?.player === 'white') {
            moves.push({ x: x + 1, y: y - 1, type: 'attack' })
          }
          if (board[x + 1]?.[y + 1]?.player === 'white') {
            moves.push({ x: x + 1, y: y + 1, type: 'attack' })
          }
          break
        case 'WR':
        case 'BR':
          for (let i = x + 1; i < 8; i++) {
            if (board[i]?.[y]?.player === turn) break
            if (board[i]?.[y]?.player === '') {
              moves.push({ x: i, y, type: 'move' })
            } else {
              moves.push({ x: i, y, type: 'attack' })
              break
            }
          }
          for (let i = x - 1; i >= 0; i--) {
            if (board[i]?.[y]?.player === turn) break
            if (board[i]?.[y]?.player === '') {
              moves.push({ x: i, y, type: 'move' })
            } else {
              moves.push({ x: i, y, type: 'attack' })
              break
            }
          }
          for (let i = y + 1; i < 8; i++) {
            if (board[x]?.[i]?.player === turn) break
            if (board[x]?.[i]?.player === '') {
              moves.push({ x, y: i, type: 'move' })
            } else {
              moves.push({ x, y: i, type: 'attack' })
              break
            }
          }
          for (let i = y - 1; i >= 0; i--) {
            if (board[x]?.[i]?.player === turn) break
            if (board[x]?.[i]?.player === '') {
              moves.push({ x, y: i, type: 'move' })
            } else {
              moves.push({ x, y: i, type: 'attack' })
              break
            }
          }
          break
        case 'WN':
        case 'BN':
          if (board[x + 2]?.[y + 1]?.player === '') {
            moves.push({ x: x + 2, y: y + 1, type: 'move' })
          } else if (board[x + 2]?.[y + 1]?.player !== turn) {
            moves.push({ x: x + 2, y: y + 1, type: 'attack' })
          }
          if (board[x + 2]?.[y - 1]?.player === '') {
            moves.push({ x: x + 2, y: y - 1, type: 'move' })
          } else if (board[x + 2]?.[y - 1]?.player !== turn) {
            moves.push({ x: x + 2, y: y - 1, type: 'attack' })
          }
          if (board[x - 2]?.[y + 1]?.player === '') {
            moves.push({ x: x - 2, y: y + 1, type: 'move' })
          } else if (board[x - 2]?.[y + 1]?.player !== turn) {
            moves.push({ x: x - 2, y: y + 1, type: 'attack' })
          }
          if (board[x - 2]?.[y - 1]?.player === '') {
            moves.push({ x: x - 2, y: y - 1, type: 'move' })
          } else if (board[x - 2]?.[y - 1]?.player !== turn) {
            moves.push({ x: x - 2, y: y - 1, type: 'attack' })
          }
          if (board[x + 1]?.[y + 2]?.player === '') {
            moves.push({ x: x + 1, y: y + 2, type: 'move' })
          } else if (board[x + 1]?.[y + 2]?.player !== turn) {
            moves.push({ x: x + 1, y: y + 2, type: 'attack' })
          }
          if (board[x + 1]?.[y - 2]?.player === '') {
            moves.push({ x: x + 1, y: y - 2, type: 'move' })
          } else if (board[x + 1]?.[y - 2]?.player !== turn) {
            moves.push({ x: x + 1, y: y - 2, type: 'attack' })
          }
          if (board[x - 1]?.[y + 2]?.player === '') {
            moves.push({ x: x - 1, y: y + 2, type: 'move' })
          } else if (board[x - 1]?.[y + 2]?.player !== turn) {
            moves.push({ x: x - 1, y: y + 2, type: 'attack' })
          }
          if (board[x - 1]?.[y - 2]?.player === '') {
            moves.push({ x: x - 1, y: y - 2, type: 'move' })
          } else if (board[x - 1]?.[y - 2]?.player !== turn) {
            moves.push({ x: x - 1, y: y - 2, type: 'attack' })
          }
          break
        case 'WB':
        case 'BB':
          for (let i = 1; i < 8; i++) {
            if (board[x + i]?.[y + i]?.player === turn) break
            if (board[x + i]?.[y + i]?.player === '') {
              moves.push({ x: x + i, y: y + i, type: 'move' })
            } else {
              moves.push({ x: x + i, y: y + i, type: 'attack' })
              break
            }
          }
          for (let i = 1; i < 8; i++) {
            if (board[x + i]?.[y - i]?.player === turn) break
            if (board[x + i]?.[y - i]?.player === '') {
              moves.push({ x: x + i, y: y - i, type: 'move' })
            } else {
              moves.push({ x: x + i, y: y - i, type: 'attack' })
              break
            }
          }
          for (let i = 1; i < 8; i++) {
            if (board[x - i]?.[y + i]?.player === turn) break
            if (board[x - i]?.[y + i]?.player === '') {
              moves.push({ x: x - i, y: y + i, type: 'move' })
            } else {
              moves.push({ x: x - i, y: y + i, type: 'attack' })
              break
            }
          }
          for (let i = 1; i < 8; i++) {
            if (board[x - i]?.[y - i]?.player === turn) break
            if (board[x - i]?.[y - i]?.player === '') {
              moves.push({ x: x - i, y: y - i, type: 'move' })
            } else {
              moves.push({ x: x - i, y: y - i, type: 'attack' })
              break
            }
          }
          break
        case 'WK':
        case 'BK':
          if (board[x + 1]?.[y]?.player === '') {
            moves.push({ x: x + 1, y, type: 'move' })
          } else if (board[x + 1]?.[y]?.player !== turn) {
            moves.push({ x: x + 1, y, type: 'attack' })
          }
          if (board[x - 1]?.[y]?.player === '') {
            moves.push({ x: x - 1, y, type: 'move' })
          } else if (board[x - 1]?.[y]?.player !== turn) {
            moves.push({ x: x - 1, y, type: 'attack' })
          }
          if (board[x]?.[y + 1]?.player === '') {
            moves.push({ x, y: y + 1, type: 'move' })
          } else if (board[x]?.[y + 1]?.player !== turn) {
            moves.push({ x, y: y + 1, type: 'attack' })
          }
          if (board[x]?.[y - 1]?.player === '') {
            moves.push({ x, y: y - 1, type: 'move' })
          } else if (board[x]?.[y - 1]?.player !== turn) {
            moves.push({ x, y: y - 1, type: 'attack' })
          }
          if (board[x + 1]?.[y + 1]?.player === '') {
            moves.push({ x: x + 1, y: y + 1, type: 'move' })
          } else if (board[x + 1]?.[y + 1]?.player !== turn) {
            moves.push({ x: x + 1, y: y + 1, type: 'attack' })
          }
          if (board[x + 1]?.[y - 1]?.player === '') {
            moves.push({ x: x + 1, y: y - 1, type: 'move' })
          } else if (board[x + 1]?.[y - 1]?.player !== turn) {
            moves.push({ x: x + 1, y: y - 1, type: 'attack' })
          }
          if (board[x - 1]?.[y + 1]?.player === '') {
            moves.push({ x: x - 1, y: y + 1, type: 'move' })
          } else if (board[x - 1]?.[y + 1]?.player !== turn) {
            moves.push({ x: x - 1, y: y + 1, type: 'attack' })
          }
          if (board[x - 1]?.[y - 1]?.player === '') {
            moves.push({ x: x - 1, y: y - 1, type: 'move' })
          } else if (board[x - 1]?.[y - 1]?.player !== turn) {
            moves.push({ x: x - 1, y: y - 1, type: 'attack' })
          }
          break
        case 'WQ':
        case 'BQ':
          for (let i = 1; i < 8; i++) {
            if (board[x + i]?.[y + i]?.player === turn) break
            if (board[x + i]?.[y + i]?.player === '') {
              moves.push({ x: x + i, y: y + i, type: 'move' })
            } else {
              moves.push({ x: x + i, y: y + i, type: 'attack' })
              break
            }
          }
          for (let i = 1; i < 8; i++) {
            if (board[x + i]?.[y - i]?.player === turn) break
            if (board[x + i]?.[y - i]?.player === '') {
              moves.push({ x: x + i, y: y - i, type: 'move' })
            } else {
              moves.push({ x: x + i, y: y - i, type: 'attack' })
              break
            }
          }
          for (let i = 1; i < 8; i++) {
            if (board[x - i]?.[y + i]?.player === turn) break
            if (board[x - i]?.[y + i]?.player === '') {
              moves.push({ x: x - i, y: y + i, type: 'move' })
            } else {
              moves.push({ x: x - i, y: y + i, type: 'attack' })
              break
            }
          }
          for (let i = 1; i < 8; i++) {
            if (board[x - i]?.[y - i]?.player === turn) break
            if (board[x - i]?.[y - i]?.player === '') {
              moves.push({ x: x - i, y: y - i, type: 'move' })
            } else {
              moves.push({ x: x - i, y: y - i, type: 'attack' })
              break
            }
          }
          for (let i = 1; i < 8; i++) {
            if (board[x + i]?.[y]?.player === turn) break
            if (board[x + i]?.[y]?.player === '') {
              moves.push({ x: x + i, y, type: 'move' })
            } else {
              moves.push({ x: x + i, y, type: 'attack' })
              break
            }
          }
          for (let i = 1; i < 8; i++) {
            if (board[x - i]?.[y]?.player === turn) break
            if (board[x - i]?.[y]?.player === '') {
              moves.push({ x: x - i, y, type: 'move' })
            } else {
              moves.push({ x: x - i, y, type: 'attack' })
              break
            }
          }
          for (let i = 1; i < 8; i++) {
            if (board[x]?.[y + i]?.player === turn) break
            if (board[x]?.[y + i]?.player === '') {
              moves.push({ x, y: y + i, type: 'move' })
            } else {
              moves.push({ x, y: y + i, type: 'attack' })
              break
            }
          }
          for (let i = 1; i < 8; i++) {
            if (board[x]?.[y - i]?.player === turn) break
            if (board[x]?.[y - i]?.player === '') {
              moves.push({ x, y: y - i, type: 'move' })
            } else {
              moves.push({ x, y: y - i, type: 'attack' })
              break
            }
          }
          break
      }

      setPosibleMoves(moves)
    },
    [board, turn],
  )

  return (
    <BoardContext.Provider
      value={{
        board,
        click,
        selectedSquare,
        posibleMoves,
        checkPosibleMoves,
        turn,
      }}
    >
      {children}
    </BoardContext.Provider>
  )
}
export const BoardConsumer = BoardContext.Consumer
