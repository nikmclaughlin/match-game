import clsx from "clsx"
import { useCallback, useEffect, useState } from "react"
import { MatchCard } from "./MatchCard"
import { cardData, useDeckOfCards } from "./cardData"

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

  const createDeck = useDeckOfCards()
  const [cardsStore, setCardsStore] = useState(createDeck())
  const [isPlayer1sTurn, setIsPlayer1sTurn] = useState(true)
  const [p1Score, setP1Score] = useState(0)
  const [p2Score, setP2Score] = useState(0)
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
    if (isPlayer1sTurn) {
      setP1Score(p1Score + 200)
    } else {
      setP2Score(p2Score + 200)
    }
    setCardsStore(() =>
      cardsStore.map((card) => {
        if (card.status == "faceUp") {
          card.bgColor = "bg-green-200 opacity-50"
          card.status = "removed"
        }
        return card
      }),
    )
  }, [cardsStore, isPlayer1sTurn, p1Score, p2Score])

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
    <div className="flex h-screen flex-col items-center gap-4 bg-stone-800 p-4 text-stone-300">
      {gameEnd ?
        <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-8 p-10">
          <div className="text-5xl">🎉</div>
          <div className="flex flex-col items-center gap-8 text-2xl">
            <div
              className={clsx(
                "rounded-full p-4",
                p1Score >= p2Score ?
                  "animate-bounce bg-green-300 text-4xl text-green-800"
                : "bg-red-800 opacity-50",
              )}
            >{`Player 1: ${p1Score}`}</div>
            <div
              className={clsx(
                "rounded-full p-4",
                p1Score <= p2Score ?
                  "animate-bounce bg-green-300 text-4xl text-green-800"
                : "bg-red-800 opacity-50",
              )}
            >{`Player 2: ${p2Score}`}</div>
          </div>
          <button
            className="group flex items-center gap-2 rounded-full bg-cyan-600 px-4 py-2 text-2xl text-stone-100 hover:bg-cyan-700"
            onClick={() => {
              setP1Score(0)
              setP2Score(0)
              setCardsStore(createDeck())
              setGameEnd(false)
            }}
          >
            <i className="fa-solid fa-refresh transition-all group-hover:rotate-45"></i>
            Play again
          </button>
        </div>
      : <>
          <div className="flex w-full max-w-3xl justify-between">
            <h1 className="flex items-center justify-center gap-2 text-4xl">
              <i className="fa-solid fa-star" />
              <div>MATCH!</div>
            </h1>
            <div className="flex flex-col gap-2">
              <div
                className={clsx(
                  "w-64 rounded-full py-2 pl-10 text-2xl",
                  isPlayer1sTurn ?
                    "bg-emerald-200 text-emerald-700"
                  : "bg-transparent",
                )}
              >{`Player 1: ${p1Score}`}</div>
              <div
                className={clsx(
                  "w-64 rounded-full py-2 pl-10 text-2xl",
                  !isPlayer1sTurn ?
                    "bg-emerald-200 text-emerald-700"
                  : "bg-transparent",
                )}
              >{`Player 2: ${p2Score}`}</div>
            </div>
          </div>
          <div className="flex w-full max-w-3xl flex-wrap justify-center gap-4">
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
