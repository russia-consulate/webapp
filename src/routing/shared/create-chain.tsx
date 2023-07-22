/* eslint-disable @typescript-eslint/no-explicit-any */

import { Query } from '@farfetched/core'
import {
  chainRoute,
  RouteInstance,
  RouteParams,
  RouteParamsAndQuery,
} from 'atomic-router'
import { createEvent, Event, sample, Store } from 'effector'
import { and, not } from 'patronum'

interface Source {
  query: Query<any, any, any>
  refresh?: boolean
  succeedIf?: Store<boolean>
}

interface Options {
  sources: Source[]
}

export function createChain<Params extends RouteParams>(
  route: RouteInstance<Params>,
  options: Options,
) {
  const { sources } = options

  const startLoading = createEvent<RouteParamsAndQuery<Params>>()
  const loadingFinished = createEvent()
  const loadingFailed = createEvent()

  for (const { query, refresh = false } of sources) {
    sample({
      clock: startLoading,
      source: query.$status,
      filter: (status) => {
        if (refresh) return status !== 'pending'
        return status === 'initial' || status === 'fail'
      },
      target: query.start,
    })
  }

  const noRefresh = sources.every((source) => !source.refresh)

  const checkTriggers: Event<any>[] = sources.map(
    (source) => source.query.finished.finally,
  )

  if (noRefresh) {
    checkTriggers.push(startLoading)
  }

  sample({
    clock: checkTriggers,
    source: sources.map((source) => {
      if (source.succeedIf) return source.succeedIf
      return source.query.$status.map((status) => status === 'done')
    }),
    filter: (statuses) => statuses.every(Boolean),
    target: loadingFinished,
  })

  sample({
    clock: checkTriggers,
    source: sources.map(({ query, succeedIf }) => {
      if (succeedIf) return and(not(query.$pending), not(succeedIf))
      return query.$status.map((status) => status === 'fail')
    }),
    filter: (statuses) => statuses.some(Boolean),
    target: loadingFailed,
  })

  return chainRoute({
    route,
    beforeOpen: startLoading,
    openOn: loadingFinished,
    cancelOn: loadingFailed,
  })
}
