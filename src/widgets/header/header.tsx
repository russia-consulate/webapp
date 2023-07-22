import { $$goBack } from '@features/go-back'
import { Button, Container, Icon } from '@shared/ui'
import { useEffect, useRef } from 'react'
import styles from './styles.module.css'

interface Props {
  title: string
}

export const Header = ({ title }: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const listener = () => {
      const header = ref.current
      if (!header) return
      header.dataset.scrolled = String(window.scrollY > 0)
    }

    window.addEventListener('scroll', listener)
    return () => window.removeEventListener('scroll', listener)
  }, [ref])

  return (
    <Container ref={ref} as="header" className={styles.header} rounded="bottom">
      <div className={styles.action}>
        <Button
          className="w-14"
          color="secondary"
          icon={<Icon name="arrow-left" size={28} />}
          onClick={$$goBack.clicked}
        />
      </div>
      <h1 className="font-interface font-bold text-[24px] leading-none">
        {title}
      </h1>
      <div className={styles.action} />
    </Container>
  )
}
