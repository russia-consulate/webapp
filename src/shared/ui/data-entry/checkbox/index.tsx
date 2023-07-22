import clsx from 'clsx'
import { forwardRef, InputHTMLAttributes, ReactNode, useRef } from 'react'
import { mergeRefs } from '../../../lib/react'
import { Icon } from '../../general/icon'
import styles from './styles.module.css'

type InputProps = InputHTMLAttributes<HTMLInputElement>

type Props = InputProps & {
  label: ReactNode
  error?: string | null
}

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ className, label, error, onChange, ...rest }, forwardedRef) => {
    const innerRef = useRef<HTMLInputElement>(null)

    return (
      <label className={clsx(styles.wrapper, className)} data-valid={!error}>
        <input
          className={styles.input}
          ref={mergeRefs(forwardedRef, innerRef)}
          type="checkbox"
          onChange={onChange}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key !== 'Enter') return
            const input = innerRef.current
            if (!input) return
            event.preventDefault()
            input.click()
          }}
          {...rest}
        />
        <div className={styles.checkbox}>
          <Icon
            name="sprite/checkbox-mark"
            className={styles.checkmark}
            size={16}
          />
        </div>
        {typeof label === 'string' ? (
          <div
            className={styles.label}
            dangerouslySetInnerHTML={{ __html: label }}
          />
        ) : (
          <div className={styles.label}>{label}</div>
        )}
      </label>
    )
  },
)
