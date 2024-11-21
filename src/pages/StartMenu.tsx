import clsx from "clsx"
import { useContext, useEffect, useState } from "react"
import {
  GameContext,
  GameContextType,
  PlayerColors,
} from "../contexts/GameContext"

const PLAYER_COLORS = [
  "emerald",
  "red",
  "violet",
  "blue",
  "yellow",
  "cyan",
  "fuchsia",
  "lime",
]

type ColorOptionType = {
  name: PlayerColors
  bg: string
  border: string
}

const COLOR_OPTIONS: ColorOptionType[] = [
  {
    name: "emerald",
    bg: "bg-emerald-400",
    border: "border-emerald-200",
  },
  {
    name: "red",
    bg: "bg-red-400",
    border: "border-red-200",
  },
  {
    name: "violet",
    bg: "bg-violet-400",
    border: "border-violet-200",
  },
  {
    name: "blue",
    bg: "bg-blue-400",
    border: "border-emerald-200",
  },
  {
    name: "yellow",
    bg: "bg-yellow-400",
    border: "border-yellow-200",
  },
  {
    name: "cyan",
    bg: "bg-cyan-400",
    border: "border-cyan-200",
  },
  {
    name: "fuchsia",
    bg: "bg-fuchsia-400",
    border: "border-fuchsia-200",
  },
  {
    name: "lime",
    bg: "bg-lime-400",
    border: "border-lime-200",
  },
]

const ColorOption = (props: {
  color: string
  index: number
  selectedColorIndex: number
  setSelectedColorIndex: (index: number) => void
}) => {
  const { color, index, selectedColorIndex, setSelectedColorIndex } = props
  const isSelected = index === selectedColorIndex
  const option = COLOR_OPTIONS.filter((option) => option.name === color)[0]

  return (
    <div
      key={index}
      className={clsx(
        "flex h-8 w-8 items-center justify-center rounded-lg border hover:scale-105 hover:opacity-95",
        option.bg,
        option.border,
      )}
      onClick={() => setSelectedColorIndex(index)}
    >
      {isSelected && (
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-stone-800/25">
          <i className="fa-solid fa-check"></i>
        </div>
      )}
    </div>
  )
}

export const StartMenu = () => {
  const { updateGameState, players } = useContext(
    GameContext,
  ) as GameContextType
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)

  useEffect(() => {
    players[0].color = COLOR_OPTIONS[selectedColorIndex].name
  }, [players, selectedColorIndex])

  return (
    <div className="flex flex-col items-center gap-10 p-20">
      <i className="fa-solid fa-star motion-safe:animate-spin-slow text-9xl text-red-400"></i>
      <div className="flex gap-10">
        <div className="flex flex-col gap-4 rounded-xl border border-stone-300 p-6">
          <div className="text-2xl">Player 1</div>
          <div className="flex gap-2">
            <label htmlFor="p1Name">Name</label>
            <input
              className="rounded-lg px-2 py-1 text-stone-700"
              id="p1Name"
              type="text"
            />
          </div>
          <div className="flex max-w-56 gap-2">
            <p>Color</p>
            <div className="flex flex-wrap gap-2">
              {PLAYER_COLORS.map((playerColor, idx) => (
                <ColorOption
                  color={playerColor}
                  index={idx}
                  selectedColorIndex={selectedColorIndex}
                  setSelectedColorIndex={setSelectedColorIndex}
                />
              ))}
            </div>
          </div>
        </div>
        <div>Form2</div>
      </div>
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
