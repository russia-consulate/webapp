import { useEffect, useLayoutEffect } from 'react'
import { FieldValues, UseFormReturn, WatchObserver } from 'react-hook-form'

/**
 * Execute some logic when the form field is changed
 * Useful for triggering side effects and updating state before render
 */
export function useWatchEffect<T extends FieldValues>(
  form: UseFormReturn<T>,
  effect: WatchObserver<T>,
) {
  useEffect(() => {
    const subscription = form.watch(effect)
    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

/**
 * Execute some logic when the form field is changed
 * Useful for doing visual updates after render (moving focus, changing styles using Ref)
 */
export function useWatchLayoutEffect<T extends FieldValues>(
  form: UseFormReturn<T>,
  effect: WatchObserver<T>,
) {
  useLayoutEffect(() => {
    const subscription = form.watch(effect)
    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
