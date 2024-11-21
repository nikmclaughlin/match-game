import clsx from "clsx"
import { PlayerColorsType } from "../../contexts/GameContext"

type ColorOptionType = {
  name: PlayerColorsType
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

export const ColorOption = (props: {
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
