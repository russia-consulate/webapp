import clsx from 'clsx'
import { CSSProperties, forwardRef, HTMLAttributes, ReactNode } from 'react'
import styles from './styles.module.css'

interface Props extends HTMLAttributes<HTMLDivElement> {
  as?: 'section' | 'header' | 'div'
  className?: string
  style?: CSSProperties
  rounded?: 'top' | 'bottom' | 'both'
  nesting?: 0 | 1
  padding?: 'base' | 'xl'
  children: ReactNode
}

export const Container = forwardRef<HTMLDivElement, Props>(
  (
    {
      as: Element = 'div',
      className,
      style,
      rounded = 'both',
      nesting = 0,
      padding = 'base',
      children,
      ...rest
    },
    outerRef,
  ) => {
    return (
      <Element
        ref={outerRef}
        className={clsx(styles.container, className)}
        style={style}
        data-rounded={rounded}
        data-nesting={nesting}
        data-padding={padding}
        {...rest}
      >
        {children}
      </Element>
    )
  },
)
