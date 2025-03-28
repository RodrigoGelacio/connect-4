import { useEffect } from "react";

export function Circle({ index, turn, restart }) {
  let circleColorClass = "circle";

  if (turn !== null && turn !== undefined) {
    circleColorClass = turn ? "circle player-1" : "circle player-2";
  }

  useEffect(() => {
    circleColorClass = "circle";
  }, [restart]);

  return <div className={circleColorClass}></div>;
}
