import './App.css'
import Board from './Board'
import { BoardProvider } from './contexts/BoardContext'

function App() {
  return (
    <div className="App">
      <BoardProvider>
        <Board />
      </BoardProvider>
    </div>
  )
}

export default App
