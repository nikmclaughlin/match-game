import { useState } from "react"
import { MatchCard } from "./MatchCard"

function App() {
  /**
   * TODO
   * - define deck(s) of cards
   * - init cards in pairs
   * - track revealed cards
   *  - only allow 2 cards revealed at a time
   *  - check if 2 revealed are match
   *    - remove cards and add to "score" (probably just a count of pairs)
   * - end game when all removed
   * - enable restart w/ new sort order
   * - add multiplayer (turns, scores)
   * - generate decks
   * - allow setting card count
   */

  const countCards = 16
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
