type ColorNames =
  | "emerald"
  | "red"
  | "violet"
  | "blue"
  | "yellow"
  | "cyan"
  | "fuchsia"
  | "lime"

export type ColorOptionType = {
  name: ColorNames
  bg: string
  border: string
  text: string
}

export const COLOR_OPTIONS: ColorOptionType[] = [
  {
    name: "emerald",
    bg: "bg-emerald-400",
    border: "border-emerald-200",
    text: "text-emerald-700",
  },
  {
    name: "red",
    bg: "bg-red-400",
    border: "border-red-200",
    text: "text-red-700",
  },
  {
    name: "violet",
    bg: "bg-violet-400",
    border: "border-violet-200",
    text: "text-violet-700",
  },
  {
    name: "blue",
    bg: "bg-blue-400",
    border: "border-blue-200",
    text: "text-blue-700",
  },
  {
    name: "yellow",
    bg: "bg-yellow-400",
    border: "border-yellow-200",
    text: "text-yellow-700",
  },
  {
    name: "cyan",
    bg: "bg-cyan-400",
    border: "border-cyan-200",
    text: "text-cyan-700",
  },
  {
    name: "fuchsia",
    bg: "bg-fuchsia-400",
    border: "border-fuchsia-200",
    text: "text-fuchsia-700",
  },
  {
    name: "lime",
    bg: "bg-lime-400",
    border: "border-lime-200",
    text: "text-lime-700",
  },
]
