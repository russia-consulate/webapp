import { Container, Typography } from '@shared/ui'
import { RouteInstance, RouteParams } from 'atomic-router'
import { Link } from 'atomic-router-react'
import clsx from 'clsx'
import styles from './menu-card.module.css'

type Action =
  | {
      type: 'link'
      to: RouteInstance<RouteParams>
    }
  | {
      type: 'external-link'
      href: string
    }
  | {
      type: 'button'
      onClick: () => void
    }

interface Props {
  className?: string
  text: string
  image: string
  skeleton?: boolean
  action: Action
}

export const MenuCard = ({
  className,
  text,
  image,
  skeleton = false,
  action,
}: Props) => {
  const content = (
    <Container
      className={clsx(styles.card, className)}
      nesting={1}
      data-skeleton={skeleton}
    >
      <div className={styles.content}>
        <Typography.Heading className="w-[120px]" size="xl">
          {text}
        </Typography.Heading>

        <img
          className={styles.image}
          src={image}
          alt="Красивая иллюстрация с градиентом"
        />
      </div>
    </Container>
  )

  if (action.type === 'button') {
    return <button onClick={action.onClick}>{content}</button>
  }

  if (action.type === 'external-link') {
    return <a href={action.href}>{content}</a>
  }

  return <Link to={action.to}>{content}</Link>
}
