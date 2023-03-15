import { useContext } from 'react'
import { BoardContext } from './contexts/BoardContext'
const useBoard = () => useContext(BoardContext)
export default useBoard
