import { useEffect, useState } from "react"
import { MatchCard } from "./MatchCard"
import { cardData, deckOfCards } from "./cardData"

function App() {
  /**
   * TODO
   * - animate/slow down reveal results
   * - end game when all removed
   * - enable restart w/ new sort order
   * - add multiplayer (turns, scores)
   * - generate decks
   * - allow setting card count
   */

  const [cardsStore, setCardsStore] = useState<cardData[]>(deckOfCards)
  const [score, setScore] = useState(0)

  const trackCards = (card: cardData) => {
    if (card.status === "faceDown") {
      console.log("found a " + card.name)
      const nextCardStore = cardsStore.map((c) => {
        if (c.id === card.id) {
          c.status = "faceUp"
        }
        return c
      })
      setCardsStore(nextCardStore)
    } else {
      console.log("hiding " + card.name)
      const nextCardStore = cardsStore.map((c) => {
        if (c.id === card.id) {
          c.status = "faceDown"
        }
        return c
      })
      setCardsStore(nextCardStore)
      // setRevealedCards(revealedCards.filter((a) => a !== card.name))
    }
  }

  useEffect(() => {
    const faceUpCards = cardsStore.filter((card) => card.status === "faceUp")
    if (
      faceUpCards.length === 2 &&
      faceUpCards[0].name === faceUpCards[1].name
    ) {
      console.log("you got a match!")
      //TODO: add to score
      setScore((score) => score + 1)
      setCardsStore(() => cardsStore.filter((card) => card.status !== "faceUp"))
    } else if (faceUpCards.length === 2) {
      // no match - return to face down
      setCardsStore(cardsStore.map((card) => ({ ...card, status: "faceDown" })))
    }
  }, [cardsStore])

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex w-full max-w-3xl justify-between">
        <h1 className="flex items-center justify-center gap-2 text-3xl">
          <i className="fa-solid fa-star" />
          <div>MATCH!</div>
        </h1>
        <div className="text-2xl">{`Score: ${score}`}</div>
      </div>
      <div className="flex w-full max-w-4xl flex-wrap justify-center gap-4">
        {cardsStore.map((card, idx) => {
          return (
            <MatchCard
              key={idx}
              card={card}
              onChange={trackCards}
            />
          )
        })}
      </div>
    </div>
  )
}

export default App
