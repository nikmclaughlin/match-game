import { FC, ReactNode, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { GameContext, GameContextType } from "../contexts/GameContext"

const GAME_STATE_ROUTES = {
  pre: "/",
  active: "/game",
  end: "end",
}

export const GameStateRouter: FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate()
  const { gameState } = useContext(GameContext) as GameContextType

  useEffect(() => {
    navigate(GAME_STATE_ROUTES[gameState])
  }, [gameState, navigate])

  return children
}
