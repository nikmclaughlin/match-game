import clsx from "clsx"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useSound from "use-sound"
import { cardData, useDeckOfCards } from "../cardData"
import { MatchCard } from "../components/MatchCard"

export const MainGame = () => {
  const createDeck = useDeckOfCards()
  const [cardsStore, setCardsStore] = useState(createDeck())
  const [isPlayer1sTurn, setIsPlayer1sTurn] = useState(true)
  const [p1Score, setP1Score] = useState(0)
  const [p2Score, setP2Score] = useState(0)
  const [gameEnd, setGameEnd] = useState(false)

  const navigate = useNavigate()

  const [playCardHide] = useSound("/cardHide.mp3")
  const [playCardReveal] = useSound("/cardReveal.mp3")
  const [playScore] = useSound("/score.mp3")
  const [playWinner] = useSound("/winner.mp3")

  const faceUpCards = cardsStore.filter((card) => card.status === "faceUp")
  const countInPlay = cardsStore.filter(
    (card) => card.status !== "removed",
  ).length

  const trackCards = (card: cardData) => {
    if (faceUpCards.length < 2) {
      if (card.status === "faceDown") {
        console.log("found a " + card.name)
        playCardReveal()
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
    playCardHide()
    setCardsStore(
      cardsStore.map((card) => {
        if (card.status === "faceUp") {
          card.status = "faceDown"
        }
        return card
      }),
    )
    playCardHide()
    setIsPlayer1sTurn(!isPlayer1sTurn)
  }, [cardsStore, isPlayer1sTurn, playCardHide])

  // check for matches
  useEffect(() => {
    if (
      faceUpCards.length === 2 &&
      faceUpCards[0].name === faceUpCards[1].name
    ) {
      console.log("you got a match!")
      playScore()
      setTimeout(removeWinningCards, 500)
    } else if (faceUpCards.length === 2) {
      // no match - return to face down
      setTimeout(returnNoMatch, 500)
    }
  }, [faceUpCards, playScore, removeWinningCards, returnNoMatch])

  // game end state
  useEffect(() => {
    if (countInPlay === 0) {
      setTimeout(() => setGameEnd(true), 500)
      playWinner()
    }
  }, [countInPlay, playWinner, setGameEnd])

  useEffect(() => {
    if (gameEnd === true) {
      navigate("/end")
    }
  }, [gameEnd, navigate])

  return (
    <>
      <div className="flex w-full max-w-xl justify-between sm:max-w-3xl">
        <h1 className="flex items-center justify-center gap-2 text-2xl sm:text-4xl">
          <i className="fa-solid fa-star text-red-400" />
          <div>MATCH!</div>
        </h1>
        <div className="flex flex-col gap-2">
          <div
            className={clsx(
              "w-48 rounded-full py-2 pl-10 text-lg sm:w-64 sm:text-2xl",
              isPlayer1sTurn ?
                "bg-emerald-200 text-emerald-700"
              : "bg-transparent",
            )}
          >{`Player 1: ${p1Score}`}</div>
          <div
            className={clsx(
              "w-48 rounded-full py-2 pl-10 text-lg sm:w-64 sm:text-2xl",
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
  )
}
