import clsx from "clsx"

type cardDisplayProps = {
  icon: string
  color: string
  bgColor?: string
}

export const Front = (props: cardDisplayProps) => {
  const { icon, color, bgColor } = props

  return (
    <div
      className={clsx(
        "flex h-full w-full items-center justify-center",
        bgColor ?? "bg-stone-100",
      )}
    >
      <i className={clsx("fa-solid text-8xl", icon, color)} />
    </div>
  )
}
