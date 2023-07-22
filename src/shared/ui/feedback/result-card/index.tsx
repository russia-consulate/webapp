/* eslint-disable react/no-array-index-key */
import { ReactNode } from 'react'
import { Typography } from '../../general/typography'
import { Container } from '../../layout/container'
import styles from './styles.module.css'

interface Props {
  title: ReactNode
  description: ReactNode[]
  actions?: ReactNode
}

export const ResultCard = ({ title, description, actions = [] }: Props) => {
  return (
    <Container className={styles.card} padding="xl">
      <Typography.Heading size="xl">{title}</Typography.Heading>

      <div className="mt-4 flex flex-col gap-3">
        {description.map((text, key) => {
          return (
            <Typography.Paragraph key={key} color="primary" size="base">
              {text}
            </Typography.Paragraph>
          )
        })}
      </div>

      {actions && <div className="flex flex-col gap-2 mt-6">{actions}</div>}
    </Container>
  )
}
