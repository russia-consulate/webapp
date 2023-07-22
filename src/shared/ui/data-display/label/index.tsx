import clsx from 'clsx'
import { ReactNode } from 'react'

interface Props {
  className?: string
  gap?: 1 | 2
  children: ReactNode
}

export const Label = ({ className, gap = 2, children }: Props) => {
  return (
    <p
      className={clsx(className, {
        'text-sm text-neutral-400': true,
        'mb-1': gap === 1,
        'mb-2': gap === 2,
      })}
    >
      {children}
    </p>
  )
}
