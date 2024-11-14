import clsx from "clsx"
import useSound from "use-sound"
import { createDeck } from "../cardData"

export const EndScreen = () => {
  const [playShuffle] = useSound("/shuffle.mp3")

  return (
    <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-8 p-10">
      <div className="text-5xl">🎉</div>
      <div className="flex flex-col items-center gap-8 text-2xl">
        <div
          className={clsx(
            "rounded-full p-4",
            p1Score >= p2Score ?
              "animate-bounce bg-green-300 text-3xl text-green-800 sm:text-4xl"
            : "bg-red-800 opacity-50",
          )}
        >{`Player 1: ${p1Score}`}</div>
        <div
          className={clsx(
            "rounded-full p-4",
            p1Score <= p2Score ?
              "animate-bounce bg-green-300 text-3xl text-green-800 sm:text-4xl"
            : "bg-red-800 opacity-50",
          )}
        >{`Player 2: ${p2Score}`}</div>
      </div>
      <button
        className="group flex items-center gap-2 rounded-full bg-cyan-600 px-4 py-2 text-2xl text-stone-100 hover:bg-cyan-700"
        onClick={() => {
          setP1Score(0)
          setP2Score(0)
          setCardsStore(createDeck())
          playShuffle()
          setGameEnd(false)
        }}
      >
        <i className="fa-solid fa-refresh transition-all group-hover:rotate-45"></i>
        Play again
      </button>
    </div>
  )
}
