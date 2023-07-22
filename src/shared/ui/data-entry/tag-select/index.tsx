import clsx from 'clsx'
import { HTMLAttributes } from 'react'
import { Skeleton } from '../../feedback/skeleton'
import styles from './styles.module.css'

interface Option<T extends string> {
  label: string
  value: T
}

type BaseAttributes = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>

type Props<T extends string> = BaseAttributes & {
  value: T | null
  onChange: (value: T) => void
  options: Option<T>[]
  skeleton?: boolean
}

export const TagSelect = <T extends string>({
  className,
  value,
  onChange,
  options,
  skeleton = false,
  ...rest
}: Props<T>) => {
  if (skeleton) {
    return (
      <div className={clsx(styles.list, className)} {...rest}>
        <Skeleton type="block" width={141} height={32} radius={8} />
      </div>
    )
  }

  return (
    <div className={clsx(styles.list, className)} {...rest}>
      {options.map((option) => {
        const selected = option.value === value

        return (
          <button
            key={option.value}
            className={styles.option}
            disabled={selected}
            onClick={() => !selected && onChange(option.value)}
            data-selected={selected}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
