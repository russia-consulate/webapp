import clsx from 'clsx'
import { HTMLAttributes } from 'react'
import styles from './styles.module.css'

interface HeadingProps extends HTMLAttributes<HTMLDivElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
  font?: 'interface' | 'text'
  size?: 'sm' | 'base' | 'xl'
}

const Heading = ({
  as: Element = 'h2',
  className,
  style,
  font = 'interface',
  size = 'base',
  children,
  ...rest
}: HeadingProps) => {
  return (
    <Element
      className={clsx(styles.heading, className)}
      style={style}
      data-font={font}
      data-size={size}
      {...rest}
    >
      {children}
    </Element>
  )
}

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string
  size?: 'sm' | 'base' | 'xl'
  color?: 'primary' | 'secondary'
  lineHeight?: 'base' | 'tight'
}

const Paragraph = ({
  className,
  style,
  size = 'sm',
  color = 'secondary',
  lineHeight = 'tight',
  children,
  ...rest
}: ParagraphProps) => {
  return (
    <p
      className={clsx(styles.paragraph, className)}
      style={style}
      data-size={size}
      data-color={color}
      data-line-height={lineHeight}
      {...rest}
    >
      {children}
    </p>
  )
}

export const Typography = {
  Heading,
  Paragraph,
}
