import { ForwardedRef, MutableRefObject, RefCallback } from 'react'

export type Refs<T extends HTMLElement> = Array<
  MutableRefObject<T> | ForwardedRef<T> | RefCallback<T>
>

export function mergeRefs<T extends HTMLElement>(...refs: Refs<T>) {
  return (element: T | null) => {
    if (!element) return
    for (const ref of refs) {
      if (typeof ref === 'function') ref(element)
      else if (ref) ref.current = element
    }
  }
}
