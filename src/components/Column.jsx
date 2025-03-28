import { useEffect, useState } from "react";
import { Circle } from "./Circle";
import { getRowToFill } from "../logic/board";
export function Column({ index, rows, turn, updateBoard, restart }) {
  const [arrayRows, setArrayRows] = useState(
    Array.from({ length: rows }).fill(null),
  );
  const columnPlayerClass = turn ? "column-player-1" : "column-player-2";
  const handleClick = () => {
    const rowtoChange = getRowToFill(arrayRows, rows);
    const newArrayRows = [...arrayRows];
    newArrayRows[rowtoChange] = turn;
    setArrayRows(newArrayRows);
    updateBoard(rowtoChange, index);
  };

  useEffect(() => {
    setArrayRows(Array.from({ length: rows }).fill(null));
  }, [restart]);

  return (
    <div className={columnPlayerClass} onClick={handleClick}>
      {arrayRows.map((turn, localIndex) => {
        return (
          <div key={`${index}-${localIndex}`} className="row">
            <Circle
              key={`${index}-${localIndex}`}
              index={localIndex}
              turn={turn}
              restart={restart}
            ></Circle>
          </div>
        );
      })}
    </div>
  );
}
