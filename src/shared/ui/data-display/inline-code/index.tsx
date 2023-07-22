interface Props {
  children: string
}

export const InlineCode = ({ children }: Props) => {
  return (
    <span className="inline-block rounded-[6px] py-1 px-[6px] leading-none bg-neutral-900 text-white">
      {children}
    </span>
  )
}
