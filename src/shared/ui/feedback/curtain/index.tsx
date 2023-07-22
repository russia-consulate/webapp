import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { ReactNode, useLayoutEffect, useRef } from 'react'
import { Icon } from '../../general/icon'
import { Container } from '../../layout/container'
import styles from './styles.module.css'

interface Props {
  isOpen: boolean
  close: () => void
  children: ReactNode
}

export const Curtain = ({ isOpen, close, children }: Props) => {
  const curtainRef = useRef<HTMLDivElement>(null)
  const scrollableRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const curtain = curtainRef.current
    const scrollable = scrollableRef.current
    if (!curtain || !scrollable) return
    if (!isOpen) return
    curtain.dataset.animation = 'in'
    setTimeout(() => delete curtain.dataset.animation, 500)
    disableBodyScroll(scrollable, { reserveScrollBarGap: true })
    return () => enableBodyScroll(scrollable)
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  const animatedClose = () => {
    const curtain = curtainRef.current
    if (!curtain) return

    curtain.dataset.animation = 'out'
    setTimeout(close, 500)
  }

  return (
    <div
      ref={curtainRef}
      className={styles.curtain}
      data-open={isOpen}
      style={{ bottom: `calc(100% - var(--tg-viewport-height))` }}
    >
      <div className={styles.overlay} />
      <div ref={scrollableRef} className={styles.scrollable}>
        <div
          className={styles.closeOutsideZone}
          onClick={animatedClose}
          role="button"
          tabIndex={-1}
        />
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <button onClick={animatedClose} className={styles.close}>
              <Icon name="close" size={32} />
            </button>
            <Container rounded="top" padding="xl">
              {children}
            </Container>
          </div>
        </div>
      </div>
    </div>
  )
}
