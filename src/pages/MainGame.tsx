import clsx from "clsx"
import { useCallback, useContext, useEffect, useState } from "react"
import useSound from "use-sound"
import { cardData, useDeckOfCards } from "../cardData"
import { MatchCard } from "../components/MatchCard"
import { GameContext, GameContextType } from "../contexts/GameContext"

export const MainGame = () => {
  const createDeck = useDeckOfCards()
  const { updateGameState, players, activePlayer, nextActivePlayer } =
    useContext(GameContext) as GameContextType
  const [cardsStore, setCardsStore] = useState(createDeck())

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
    players[activePlayer].score += 200
    setCardsStore(() =>
      cardsStore.map((card) => {
        if (card.status == "faceUp") {
          card.bgColor = "bg-green-200 opacity-50"
          card.status = "removed"
        }
        return card
      }),
    )
  }, [activePlayer, cardsStore, players])

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
    nextActivePlayer()
  }, [cardsStore, nextActivePlayer, playCardHide])

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
      // TODO: figure out why this is triggering twice?
      setTimeout(() => updateGameState("end"), 500)
      playWinner()
    }
  }, [countInPlay, playWinner, updateGameState])

  return (
    <>
      <div className="flex w-full max-w-xl justify-between sm:max-w-3xl">
        <h1 className="flex items-center justify-center gap-2 text-2xl sm:text-4xl">
          <i className="fa-solid fa-star text-red-400" />
          <div>MATCH!</div>
        </h1>
        <div className="flex flex-col gap-2">
          {players.map((player, idx) => {
            return (
              <div key={idx}>
                <div
                  className={clsx(
                    "w-48 rounded-full py-2 pl-10 text-lg sm:w-64 sm:text-2xl",
                    idx === activePlayer ?
                      "bg-emerald-200 text-emerald-700"
                    : "bg-transparent",
                  )}
                >
                  {player.name}: {player.score}
                </div>
              </div>
            )
          })}
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
