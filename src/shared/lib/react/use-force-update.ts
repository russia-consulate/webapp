import { useCallback, useState } from 'react'

export function useForceUpdate() {
  const [, setCount] = useState(0)
  return useCallback(() => setCount((c) => c + 1), [])
}
