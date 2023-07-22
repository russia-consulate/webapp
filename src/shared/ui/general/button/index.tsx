import { RouteParams } from 'atomic-router'
import { Link, LinkProps } from 'atomic-router-react'
import clsx from 'clsx'
import { ButtonHTMLAttributes, FC, forwardRef, ReactNode } from 'react'
import { Skeleton } from '../../feedback/skeleton'
import styles from './styles.module.css'
import { ButtonColor, ButtonSize, ButtonVariant } from './types'

interface SharedProps {
  size?: ButtonSize
  variant?: ButtonVariant
  color?: ButtonColor
  fluid?: boolean
  loading?: boolean
  disabled?: boolean
  loadingText?: ReactNode
  icon?: ReactNode
}

const createDataset = ({
  loading = false,
  disabled = false,
  size = 'md',
  variant = 'solid',
  color = 'primary',
  fluid = false,
}: SharedProps) => ({
  'data-disabled': loading || disabled,
  'data-loading': loading,
  'data-size': size,
  'data-color': color,
  'data-variant': variant,
  'data-fluid': fluid,
})

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & SharedProps

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef) => {
    const {
      className,
      children,
      loading = false,
      disabled = loading,
      loadingText = children,
      icon,
      fluid,
      variant,
      size,
      color,
      ...rest
    } = props

    const dataset = createDataset(props)

    return (
      <button
        ref={forwardedRef}
        className={clsx(styles.button, className)}
        disabled={loading || disabled}
        {...dataset}
        {...rest}
      >
        {loading ? <LoadingIcon /> : icon}
        {loading ? loadingText : children}
      </button>
    )
  },
)

export type ButtonLinkProps<T extends RouteParams> = SharedProps & LinkProps<T>

interface ButtonLinkForwarded extends FC<ButtonLinkProps<RouteParams>> {
  <T extends RouteParams>(
    props: ButtonLinkProps<T>,
  ): ReturnType<FC<ButtonLinkProps<T>>>
}

export const ButtonLink: ButtonLinkForwarded = forwardRef<
  HTMLAnchorElement,
  ButtonLinkProps<RouteParams>
>((props, forwardedRef) => {
  const {
    className,
    children,
    loading = false,
    disabled = loading,
    loadingText = children,
    icon,
    onClick,
    fluid,
    variant,
    size,
    color,
    ...rest
  } = props

  const dataset = createDataset(props)

  return (
    <Link
      ref={forwardedRef}
      className={clsx(styles.button, className)}
      onClick={(event) => disabled && event.preventDefault()}
      {...dataset}
      {...rest}
    >
      {loading ? <LoadingIcon /> : icon}
      {loading ? loadingText : children}
    </Link>
  )
})

export const ButtonSkeleton = () => {
  return <Skeleton type="block" height={56} radius={16} />
}

const LoadingIcon = () => {
  return (
    <svg
      className="animate-spin"
      viewBox="0 0 1024 1024"
      focusable="false"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" />
    </svg>
  )
}
