import { useContext } from "react"
import { GameContext, GameContextType } from "../contexts/GameContext"

import useSound from "use-sound"
import { PlayerStartForm } from "../components/PlayerStartForm"

export const StartMenu = () => {
  const { updateGameState, players } = useContext(
    GameContext,
  ) as GameContextType
  const [playShuffle] = useSound("/shuffle.mp3")

  // useEffect(() => {
  //   players[0].color = COLOR_OPTIONS[selectedColorIndex].name
  // }, [players, selectedColorIndex])

  return (
    <div className="flex flex-col items-center gap-10 p-20">
      <i className="fa-solid fa-star text-9xl text-red-400 motion-safe:animate-spin-slow"></i>
      <div className="flex gap-10">
        {players.map((player, idx) => (
          <PlayerStartForm
            player={player}
            formNumber={idx}
            key={idx}
          />
        ))}
      </div>
      <button
        className="rounded-full bg-emerald-600 p-4 text-4xl hover:bg-emerald-800"
        onClick={() => {
          playShuffle()
          updateGameState("active")
        }}
      >
        START GAME
      </button>
    </div>
  )
}
