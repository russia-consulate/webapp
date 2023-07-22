import { useRef, useState } from 'react'
import { FieldPath, FieldValues, get, UseFormReturn } from 'react-hook-form'
import { useForceUpdate } from '../react'
import { useWatchEffect } from './watch-effects'

function isNotEmpty<T>(object: T, path?: string): boolean {
  const value = get(object, path)
  if (typeof value === 'object') return Object.values(value).some(Boolean)
  return Boolean(value)
}

/**
 * Returns "true" when form field is not empty
 * Not causes extra re-renders
 */
export function useFilled<
  TValues extends FieldValues,
  TPath extends FieldPath<TValues>,
>(form: UseFormReturn<TValues>, path: TPath): boolean {
  const [defaultFilled] = useState(() =>
    isNotEmpty(form.formState.defaultValues, path),
  )

  const filledRef = useRef<boolean>(defaultFilled)
  const forceUpdate = useForceUpdate()

  useWatchEffect(form, (values, info) => {
    if (!info.name?.startsWith(path)) return

    const isEmpty = isNotEmpty(values, path)

    if (isEmpty !== filledRef.current) {
      filledRef.current = isEmpty
      forceUpdate()
    }
  })

  return filledRef.current
}
