import clsx from "clsx"

type cardDisplayProps = {
  icon: string
  color: string
}

export const Front = (props: cardDisplayProps) => {
  const { icon, color } = props

  return (
    <div className="flex h-full w-full items-center justify-center bg-stone-100">
      <i className={clsx("fa-solid text-8xl", icon, color)} />
    </div>
  )
}
