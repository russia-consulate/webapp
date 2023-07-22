import clsx from 'clsx'
import { CSSProperties } from 'react'
import { Icon } from '../../general/icon'
import styles from './styles.module.css'

interface Props {
  className?: string
  style?: CSSProperties
}

export const Loader = ({ className, style }: Props) => {
  return (
    <div className={clsx(styles.loader, className)} style={style}>
      <Icon name="sprite/loader" size={110} />
    </div>
  )
}
