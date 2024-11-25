import { createContext, FC, ReactNode, useState } from "react"
import { COLOR_OPTIONS, ColorOptionType } from "../services/colorService"

export type PlayerType = {
  name: string
  color: ColorOptionType
  score: number
}

export type GameContextType = {
  gameState: "pre" | "active" | "end"
  players: PlayerType[]
  activePlayer: number
  updatePlayers: (players: PlayerType[]) => void
  updatePlayerByNumber: <K extends keyof PlayerType>(
    playerNumber: number,
    newProp: { key: K; value: PlayerType[K] },
  ) => void
  nextActivePlayer: () => void
  updateGameState: (newState: GameContextType["gameState"]) => void
}

export const GameContext = createContext<GameContextType | null>(null)

export const GameProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameState] =
    useState<GameContextType["gameState"]>("pre")
  const [activePlayer, setActivePlayer] = useState(0)
  const [players, setPlayers] = useState<PlayerType[]>([
    {
      name: "player 1",
      color: COLOR_OPTIONS[0],
      score: 0,
    },
    {
      name: "player 2",
      color: COLOR_OPTIONS[1],
      score: 0,
    },
  ])
  const updatePlayers = (players: PlayerType[]) => {
    setPlayers(players)
  }

  const updatePlayerByNumber = <K extends keyof PlayerType>(
    playerNumber: number,
    newProp: { key: K; value: PlayerType[K] },
  ) => {
    const newPlayers = players
    newPlayers[playerNumber][newProp.key] = newProp.value
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
        updatePlayerByNumber,
        nextActivePlayer,
        updateGameState,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
