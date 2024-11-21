import { useContext, useState } from "react"
import {
  GameContext,
  GameContextType,
  PlayerType,
} from "../../contexts/GameContext"
import { ColorOption } from "./ColorOption"

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

export const PlayerStartForm = (player: PlayerType) => {
  const { updatePlayers } = useContext(GameContext) as GameContextType
  const [playerName, setPlayerName] = useState(player.name)
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)

  //   TODO: Player update logic to change state in context to match local form state

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-stone-300 p-6">
      <div className="text-2xl">{playerName || "Settings"}</div>
      <div className="flex gap-2">
        <label htmlFor="playerName">Name</label>
        <input
          className="rounded-lg px-2 py-1 text-stone-700"
          id="playerName"
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </div>
      <div className="flex max-w-56 gap-2">
        <label htmlFor="playerColor">Color</label>
        <div
          className="flex flex-wrap gap-2"
          id="playerColor"
        >
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
  )
}
