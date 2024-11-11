import { useCallback, useEffect, useState } from "react"
import { MatchCard } from "./MatchCard"
import { cardData, useDeckOfCards } from "./cardData"

function App() {
  /**
   * TODO
   * - add multiplayer (turns, scores)
   */

  const createDeck = useDeckOfCards()
  const [cardsStore, setCardsStore] = useState<cardData[]>(createDeck())
  const [isPlayer1sTurn, setIsPlayer1sTurn] = useState(true)
  const [score, setScore] = useState(0)
  const [gameEnd, setGameEnd] = useState(false)

  const faceUpCards = cardsStore.filter((card) => card.status === "faceUp")
  const countInPlay = cardsStore.filter(
    (card) => card.status !== "removed",
  ).length

  const trackCards = (card: cardData) => {
    if (faceUpCards.length < 2) {
      if (card.status === "faceDown") {
        console.log("found a " + card.name)
        const nextCardStore = cardsStore.map((c) => {
          if (c.id === card.id) {
            c.status = "faceUp"
          }
          return c
        })
        setCardsStore(nextCardStore)
      }
    }
  }

  const removeWinningCards = useCallback(() => {
    setScore(score + 200)
    setCardsStore(() =>
      cardsStore.map((card) => {
        if (card.status == "faceUp") {
          card.bgColor = "bg-green-200 opacity-50"
          card.status = "removed"
        }
        return card
      }),
    )
  }, [cardsStore, score])

  const returnNoMatch = useCallback(() => {
    setCardsStore(
      cardsStore.map((card) => {
        if (card.status === "faceUp") {
          card.status = "faceDown"
        }
        return card
      }),
    )
    setIsPlayer1sTurn(!isPlayer1sTurn)
  }, [cardsStore, isPlayer1sTurn])

  // check for matches
  useEffect(() => {
    if (
      faceUpCards.length === 2 &&
      faceUpCards[0].name === faceUpCards[1].name
    ) {
      console.log("you got a match!")
      setTimeout(removeWinningCards, 500)
    } else if (faceUpCards.length === 2) {
      // no match - return to face down
      setTimeout(returnNoMatch, 500)
    }
  }, [faceUpCards, removeWinningCards, returnNoMatch])

  // game end state
  useEffect(() => {
    if (countInPlay === 0) {
      setTimeout(() => setGameEnd(true), 500)
    }
  }, [countInPlay, setGameEnd])

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {gameEnd ?
        <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-4 p-10">
          <div className="animate-bounce text-5xl">🎉</div>
          <button
            className="rounded-full bg-emerald-600 px-4 py-2 text-stone-100 hover:bg-emerald-700"
            onClick={() => {
              setScore(0)
              setCardsStore(createDeck())
              setGameEnd(false)
            }}
          >
            Play again
          </button>
        </div>
      : <>
          <div className="flex w-full max-w-3xl justify-between">
            <h1 className="flex items-center justify-center gap-2 text-3xl">
              <i className="fa-solid fa-star" />
              <div>MATCH!</div>
            </h1>
            <div>{`Current Player: ${isPlayer1sTurn ? "1" : "2"}`}</div>
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
        </>
      }
    </div>
  )
}

export default App
