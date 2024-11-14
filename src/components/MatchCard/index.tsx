import clsx from "clsx"
import { cardData } from "../../cardData"
import { Front } from "./Front"

export type MatchCardProps = {
  card: cardData
  onChange: (card: cardData) => void
}

export const MatchCard = ({ card, onChange }: MatchCardProps) => {
  return (
    <div
      className={clsx(
        "aspect-square h-1/4 w-1/5 cursor-pointer overflow-clip rounded-lg border-2 border-stone-600",
        card.status === "faceDown" && "hover:scale-105",
      )}
      onClick={() => onChange(card)}
    >
      {card.status === "faceDown" ?
        <div className="flex h-full w-full flex-col items-center justify-center bg-red-400">
          <i className="fa-solid fa-star rounded-full border-2 border-red-500 p-2 text-3xl text-red-500 sm:text-6xl" />
        </div>
      : <Front
          icon={card.icon}
          color={card.color}
          bgColor={card.bgColor}
        />
      }
    </div>
  )
}
