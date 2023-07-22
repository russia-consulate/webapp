import clsx from 'clsx'
import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useLayoutEffect,
  useRef,
} from 'react'
import { mergeRefs } from '../../../lib/react'
import { Label } from '../../data-display/label'
import styles from './styles.module.css'

type InputProps = InputHTMLAttributes<HTMLInputElement>

type Props = InputProps & {
  label?: string
  filled?: boolean
  error?: string
  icon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    { className, label, filled = false, error, icon, ...rest },
    forwardedRef,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const iconRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
      const input = inputRef.current
      const icon = iconRef.current
      if (!input || !icon) return

      const { width } = icon.getBoundingClientRect()
      input.style.paddingRight = `${width}px`

      return () => {
        input.style.paddingRight = ''
      }
    }, [inputRef, iconRef, icon])

    return (
      <label
        className={clsx(styles.wrapper, className)}
        data-filled={filled}
        data-valid={!error}
      >
        {label && <Label>{label}</Label>}
        <div className="relative">
          <input
            ref={mergeRefs(forwardedRef, inputRef)}
            className={styles.input}
            {...rest}
          />
          {icon && (
            <div ref={iconRef} className={styles.icon}>
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p
            className={styles.error}
            dangerouslySetInnerHTML={{ __html: error }}
          />
        )}
      </label>
    )
  },
)
