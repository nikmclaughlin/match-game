import { useContext } from "react"
import { GameContext, GameContextType } from "../contexts/GameContext"

export const StartMenu = () => {
  const { updateGameState } = useContext(GameContext) as GameContextType
  return (
    <div className="flex flex-col items-center gap-10 p-20">
      <i className="fa-solid fa-star animate-bounce text-9xl text-red-400"></i>
      <button
        className="rounded-full bg-emerald-600 p-4 text-4xl"
        onClick={() => {
          updateGameState("active")
        }}
      >
        START GAME
      </button>
    </div>
  )
}
