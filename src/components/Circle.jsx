const getColorClass = ({ turn, restart } = {}) => {
  const isTurnUndefined = turn === null || turn === undefined

  if (isTurnUndefined || restart) {
    return ""
  }

  return turn ? "player-1" : "player-2"
}

export function Circle({ turn, restart }) {
  const colorClass = getColorClass({ turn, restart })

  return <span className={`${colorClass} circle`}></span>
}
