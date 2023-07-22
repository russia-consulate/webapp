import clsx from 'clsx'
import { useUnit } from 'effector-react'
import { ReactNode, RefObject, useEffect, useLayoutEffect, useRef } from 'react'
import { Container } from '../container'
import { $height, heightChanged } from './model'
import styles from './styles.module.css'

interface Props {
  className?: string
  children: ReactNode
}

export const StickyActions = ({ className, children }: Props) => {
  const height = useUnit($height)
  const ref = useRef<HTMLDivElement>(null)
  useSyncHeight(ref)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const updateStyles = ({ isStateStable }: { isStateStable: boolean }) => {
      if (!isStateStable) return

      if (Telegram.WebApp.isExpanded) {
        element.style.removeProperty('top')
        element.style.bottom = '0px'
      } else {
        element.style.removeProperty('bottom')
        element.style.top = `calc(var(--tg-viewport-stable-height) - ${height}px)`
      }
    }

    updateStyles({ isStateStable: true })
    Telegram.WebApp.onEvent('viewportChanged', updateStyles)

    return () => {
      Telegram.WebApp.offEvent('viewportChanged', updateStyles)
    }
  }, [ref, height])

  return (
    <Container
      ref={ref}
      className={clsx(styles.container, className)}
      rounded="top"
    >
      {children}
    </Container>
  )
}

function useSyncHeight(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const element = ref.current
    if (!element) return

    const listener = () => {
      const { height } = element.getBoundingClientRect()
      heightChanged(height)

      return () => heightChanged(0)
    }

    // sync on initial render
    listener()

    const observer = new MutationObserver(listener)
    const config = { attributes: true, childList: true, subtree: true }

    window.addEventListener('resize', listener, { passive: true })
    observer.observe(element, config)

    return () => {
      heightChanged(0)
      window.removeEventListener('resize', listener)
      observer.disconnect()
    }
  }, [ref])
}
