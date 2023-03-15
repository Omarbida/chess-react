import useBoard from './useBoard'
function Square(props) {
  const boardContext = useBoard()
  let classes =
    boardContext.selectedSquare?.x === props.x &&
    boardContext.selectedSquare?.y === props.y
      ? ' selected'
      : ''

  boardContext.posibleMoves?.map((move) => {
    if (move.x === props.x && move.y === props.y) {
      if (move.type === 'attack') classes += ' posible attack'
      else {
        classes += ' posible move'
      }
    }
  })

  return (
    <button
      className={classes + ' ' + props.className}
      onClick={() => {
        boardContext.click(
          Number(props.x),
          Number(props.y),
          boardContext.board[props.x][props.y].piece,
          boardContext.board[props.x][props.y].player,
        )
      }}
    >
      {boardContext.board[props.x][props.y].piece != '' ? (
        <img
          src={`./pieces/${boardContext.board[props.x][props.y].piece}.png`}
        />
      ) : (
        ''
      )}
    </button>
  )
}
export default Square
