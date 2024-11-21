import { createContext, FC, ReactNode, useState } from "react"

export type PlayerColors =
  | "emerald"
  | "red"
  | "violet"
  | "blue"
  | "yellow"
  | "cyan"
  | "fuchsia"
  | "lime"

type Player = {
  name: string
  color: PlayerColors
  score: number
}

export type GameContextType = {
  gameState: "pre" | "active" | "end"
  players: Player[]
  activePlayer: number
  updatePlayers: (players: Player[]) => void
  nextActivePlayer: () => void
  updateGameState: (newState: GameContextType["gameState"]) => void
}

export const GameContext = createContext<GameContextType | null>(null)

export const GameProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameState] =
    useState<GameContextType["gameState"]>("pre")
  const [activePlayer, setActivePlayer] = useState(0)
  const [players, setPlayers] = useState<Player[]>([
    {
      name: "player 1",
      color: "emerald",
      score: 0,
    },
    {
      name: "player 2",
      color: "yellow",
      score: 0,
    },
  ])
  const updatePlayers = (players: Player[]) => {
    setPlayers(players)
  }
  const nextActivePlayer = () => {
    setActivePlayer(activePlayer + 1 >= players.length ? 0 : activePlayer + 1)
  }
  const updateGameState = (newState: GameContextType["gameState"]) => {
    console.log({ from: gameState, to: newState })
    if (newState === "active") {
      const nextPlayers = players.map((player) => {
        return { ...player, score: 0 }
      })
      setPlayers(nextPlayers)
    }
    setGameState(newState)
  }

  return (
    <GameContext.Provider
      value={{
        gameState,
        players,
        activePlayer,
        updatePlayers,
        nextActivePlayer,
        updateGameState,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
