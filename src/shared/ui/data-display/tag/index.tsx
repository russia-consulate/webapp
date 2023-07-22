import clsx from 'clsx'
import { ReactNode } from 'react'
import { Skeleton } from '../../feedback/skeleton'
import { Icon, IconName } from '../../general/icon'
import styles from './styles.module.css'

type TagColor = 'gray' | 'blue' | 'orange' | 'green' | 'pink' | 'purple'

interface TagProps {
  className?: string
  color?: TagColor
  icon?: IconName
  children: ReactNode
}

export const Tag = ({
  className,
  color = 'gray',
  icon,
  children,
}: TagProps) => {
  return (
    <div className={clsx(styles.tag, className)} data-color={color}>
      {icon && <Icon name={icon} size={16} />}
      <span className={styles.text}>{children}</span>
    </div>
  )
}

interface SkeletonProps {
  className?: string
  width?: number | string
}

export const TagSkeleton = ({ className, width = 120 }: SkeletonProps) => {
  return (
    <Skeleton type="block" width={width} height={28} className={className} />
  )
}
