import { useState } from "react"
import { Front } from "./Front"

export type MatchCardProps = {
  icon: string
  color: string
}

export const MatchCard = (props: MatchCardProps) => {
  const { icon, color } = props
  const [isRevealed, setIsRevealed] = useState(false)

  return (
    <div
      className="h-56 w-44 cursor-pointer overflow-clip rounded-lg border-2 border-red-600"
      onClick={() => setIsRevealed(!isRevealed)}
    >
      {isRevealed ?
        <Front
          icon={icon}
          color={color}
        />
      : <div className="flex h-full w-full flex-col items-center justify-center bg-red-400">
          <i className="fa-solid fa-star rounded-full border-2 border-red-500 p-2 text-6xl text-red-500" />
        </div>
      }
    </div>
  )
}
