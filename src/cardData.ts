export type cardData = {
  id?: number
  name: string
  icon: string
  color: string
  status: "faceDown" | "faceUp" | "removed"
}

// TODO: make this a function that generates an array of unique cards
const singleCards: cardData[] = [
  {
    name: "blue circle",
    icon: "fa-circle",
    color: "text-blue-400",
    status: "faceDown",
  },
  {
    name: "yellow star",
    icon: "fa-star",
    color: "text-yellow-400",
    status: "faceDown",
  },
  {
    name: "green triangle",
    icon: "fa-play",
    color: "text-green-400",
    status: "faceDown",
  },
  {
    name: "orange fish",
    icon: "fa-fish",
    color: "text-orange-400",
    status: "faceDown",
  },
  {
    name: "red square",
    icon: "fa-square",
    color: "text-red-400",
    status: "faceDown",
  },
  {
    name: "brown dog",
    icon: "fa-dog",
    color: "text-yellow-900",
    status: "faceDown",
  },
  {
    name: "gray cat",
    icon: "fa-cat",
    color: "text-gray-500",
    status: "faceDown",
  },
  {
    name: "black bird",
    icon: "fa-crow",
    color: "text-stone-800",
    status: "faceDown",
  },
]

// create pairs, shuffle, and tag with id
export const deckOfCards = singleCards
  .concat(singleCards)
  .map((value) => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value)
  .map((card, idx) => ({ ...card, id: idx }))