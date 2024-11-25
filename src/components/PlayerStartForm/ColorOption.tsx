import clsx from "clsx"
import { COLOR_OPTIONS } from "../../services/colorService"

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
