import { useBoardColumn } from "@/modules/board/hooks/useBoard"
import { Circle } from "./Circle"

export function Column({ index, rows, turn, updateBoard, restart }) {
  const { boardRows, handleColumnSelection } = useBoardColumn({
    rows,
    restart,
    updateBoard,
    turn,
    columnIndex: index,
  })

  const columnPlayerClass = turn ? "player-1" : "player-2"

  return (
    <div
      className={`column ${columnPlayerClass}`}
      onClick={() => {
        handleColumnSelection()
      }}
    >
      {boardRows.map((turn, localIndex) => (
        <div className="row" key={`${index}-${localIndex}`}>
          <Circle turn={turn} />
        </div>
      ))}
    </div>
  )
}
