import { RouteInstance, RouteParams } from 'atomic-router'
import { useUnit } from 'effector-react'
import { useCallback, useEffect } from 'react'
import { actionRef } from './model'

export function useBackAction(action: () => void) {
  useEffect(() => {
    const saved = actionRef.current
    actionRef.current = action

    return () => {
      actionRef.current = saved
    }
  }, [action])
}

export function useBackRoute(route: RouteInstance<RouteParams>) {
  const navigate = useUnit(route.navigate)

  const action = useCallback(
    () => navigate({ params: {}, query: {} }),
    [navigate],
  )

  useBackAction(action)
}
