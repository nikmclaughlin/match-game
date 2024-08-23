import { useState } from "react"
import { MatchCard } from "./MatchCard"

function App() {
  const [countCards, setCountCards] = useState(16)

  const cards = []

  for (let i = 0; i < countCards; i++) {
    cards.push(
      <MatchCard
        key={i}
        icon="fa-circle"
        color="text-blue-400"
      />,
    )
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="flex items-center justify-center gap-2 text-2xl">
        <i className="fa-solid fa-star" />
        <div>MATCH!</div>
      </h1>
      <div className="flex w-full max-w-4xl flex-wrap justify-center gap-4">
        {cards}
      </div>
    </div>
  )
}

export default App
