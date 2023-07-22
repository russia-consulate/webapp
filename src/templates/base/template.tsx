import { $$stickyActions } from '@shared/ui'
import { useUnit } from 'effector-react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const BaseTemplate = ({ children }: Props) => {
  const stickyActionsHeight = useUnit($$stickyActions.$height)

  return (
    <main
      className="flex flex-col"
      style={{
        minHeight: 'var(--tg-viewport-stable-height)',
        paddingBottom: stickyActionsHeight,
      }}
    >
      {children}
    </main>
  )
}
