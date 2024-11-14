import { BrowserRouter, Route, Routes } from "react-router-dom"
import { GameContext } from "./contexts/GameContext.ts"
import { PlayerContext } from "./contexts/PlayerContext.ts"
import { EndScreen } from "./pages/EndScreen.tsx"
import { MainGame } from "./pages/MainGame.tsx"
import { StartMenu } from "./pages/StartMenu.tsx"

function App() {
  /**
   * TODO
   * - Improve handling for player state
   *   - name
   *   - score
   *   - color
   * - and game state
   *   - turn
   *   - state
   *   - winner
   */

  return (
    <GameContext.Provider>
      <PlayerContext.Provider>
        <div className="flex h-screen flex-col items-center gap-4 bg-stone-800 p-4 text-stone-300">
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<StartMenu />}
              />
              <Route
                path="/game"
                element={<MainGame />}
              />
              <Route
                path="/end"
                element={<EndScreen />}
              />
            </Routes>
          </BrowserRouter>
        </div>
      </PlayerContext.Provider>
    </GameContext.Provider>
  )
}

export default App
