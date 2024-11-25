import clsx from "clsx"
import { useContext } from "react"
import useSound from "use-sound"
import { GameContext, GameContextType } from "../contexts/GameContext"

export const EndScreen = () => {
  const [playShuffle] = useSound("/shuffle.mp3")
  const { updateGameState, players } = useContext(
    GameContext,
  ) as GameContextType

  const winningScore = players.reduce((highest, player) => {
    return highest > player.score ? highest : player.score
  }, 0)

  return (
    <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-8 p-10">
      <div className="text-5xl">🎉</div>
      <div className="flex flex-col items-center gap-8 text-2xl">
        {players.map((player, idx) => {
          return (
            <div
              key={idx}
              className={clsx(
                "rounded-full p-4 shadow-lg",
                [player.color.bg, player.color.text],
                winningScore === player.score ?
                  "animate-bounce text-3xl sm:text-4xl"
                : "opacity-50",
              )}
            >
              {player.name}: {player.score}
            </div>
          )
        })}
      </div>
      <div className="flex flex-col items-center gap-4 py-10">
        <button
          className="group flex w-44 items-center justify-center gap-2 rounded-full bg-cyan-600 px-4 py-2 text-2xl text-stone-100 hover:bg-cyan-700"
          onClick={() => {
            playShuffle()
            updateGameState("active")
          }}
        >
          <i className="fa-solid fa-refresh transition-all group-hover:rotate-45"></i>
          Play again
        </button>
        <button
          className="group flex w-44 items-center justify-center gap-2 rounded-full bg-yellow-600 px-4 py-2 text-2xl text-stone-100 hover:bg-yellow-700"
          onClick={() => updateGameState("pre")}
        >
          <i className="fa-solid fa-bars transition-all group-hover:-translate-x-1 group-hover:skew-x-[20deg]"></i>
          Return
        </button>
      </div>
    </div>
  )
}
