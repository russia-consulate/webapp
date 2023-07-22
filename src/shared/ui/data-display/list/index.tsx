import clsx from 'clsx'
import { HTMLAttributes, ReactNode } from 'react'
import { Icon } from '../../general/icon'
import styles from './styles.module.css'

interface ListProps extends HTMLAttributes<HTMLUListElement> {
  className?: string
  children: ReactNode
}

export const List = ({ className, style, children, ...rest }: ListProps) => {
  return (
    <ul className={clsx(styles.list, className)} {...rest}>
      {children}
    </ul>
  )
}

interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
  className?: string
  children: ReactNode
}

export const ListItem = ({ className, children, ...rest }: ListItemProps) => {
  return (
    <li className={styles.listItem} {...rest}>
      <Icon
        className="shrink-0 translate-y-[3px]"
        name="checkmark-circle"
        size={16}
      />
      <span>{children}</span>
    </li>
  )
}
