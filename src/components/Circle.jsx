import { useState } from "react"
import { useEffect } from "react"

export function Circle({ turn, restart }) {
  const [colorClass, setColorClass] = useState("")

  useEffect(() => {
    if (restart) {
      setColorClass("")
      return
    }

    if (turn === null || turn === undefined) return

    const currentColorClass = turn === true ? "player-1" : "player-2"

    setColorClass(currentColorClass)
  }, [turn, restart])

  return <span className={[colorClass, "circle"].join(" ")}></span>
}
