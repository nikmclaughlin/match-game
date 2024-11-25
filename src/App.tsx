import { BrowserRouter, Route, Routes } from "react-router-dom"
import { GameStateRouter } from "./components/GameStateRouter.tsx"
import { GameProvider } from "./contexts/GameContext.tsx"
import { EndScreen } from "./pages/EndScreen.tsx"
import { MainGame } from "./pages/MainGame.tsx"
import { StartMenu } from "./pages/StartMenu.tsx"

function App() {
  return (
    <GameProvider>
      <div className="flex h-full flex-col items-center gap-4 bg-stone-800 p-4 text-stone-300">
        <BrowserRouter>
          <GameStateRouter>
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
          </GameStateRouter>
        </BrowserRouter>
      </div>
    </GameProvider>
  )
}

export default App
