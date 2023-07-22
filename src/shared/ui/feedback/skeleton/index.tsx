import clsx from 'clsx'
import styles from './styles.module.css'

interface Props {
  className?: string
  type: 'block' | 'inline'
  width?: number | string
  maxWidth?: number | string
  height?: number | string
  radius?: number | string
}

export const Skeleton = ({
  className,
  type,
  width: maxWidth = '100%',
  height = 'auto',
  radius: borderRadius = 6,
}: Props) => {
  const Element = type === 'block' ? 'div' : 'span'

  return (
    <Element
      className={clsx(className, styles.skeleton)}
      style={{
        maxWidth,
        height,
        borderRadius,
      }}
      data-type={type}
    >
      &zwnj;
    </Element>
  )
}
