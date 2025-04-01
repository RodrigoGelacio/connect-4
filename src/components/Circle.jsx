const getColorClass = ({ turn } = {}) => {
  const isTurnUndefined = turn === null || turn === undefined

  if (isTurnUndefined) {
    return ""
  }

  return turn ? "player-1" : "player-2"
}

export function Circle({ turn }) {
  const colorClass = getColorClass({ turn })

  return <span className={`${colorClass} circle`} />
}
