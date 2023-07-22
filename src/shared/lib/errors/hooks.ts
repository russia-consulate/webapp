import { useCallback, useState } from 'react'

/*
 * Transfer error from outside render to ErrorBoundary
 */
export function useThrowRenderError() {
  const [error, setError] = useState<unknown>(null)

  if (error) {
    throw error
  }

  return useCallback((error: unknown) => {
    setError(error)
  }, [])
}
