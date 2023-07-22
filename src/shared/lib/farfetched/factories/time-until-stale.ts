import { Query } from '@farfetched/core'
import { createFactory } from '@withease/factories'
import { createEvent, sample } from 'effector'
import { interval } from 'patronum'

export interface TimeUntilStaleOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: Query<any, any, any>
  timeout: number
}

export const timeUntilStale = createFactory(
  (options: TimeUntilStaleOptions) => {
    const { query, timeout } = options

    const start = createEvent()
    const stop = createEvent()

    const { tick } = interval({
      start,
      stop,
      timeout,
    })

    sample({ clock: query.finished.success, target: start })
    sample({ clock: tick, fn: () => true, target: query.$stale })
    sample({ source: query.$stale, filter: Boolean, target: stop })
  },
)
