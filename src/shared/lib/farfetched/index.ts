import { Mutation, Query } from '@farfetched/core'
import { invoke } from '@withease/factories'
import { ErrorHandlers, handleAll } from './factories/errors'
import { timeUntilStale } from './factories/time-until-stale'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const QueryTools = (query: Query<any, any, any>) => ({
  timeUntilStale: (timeout: number) =>
    invoke(timeUntilStale, { query, timeout }),
  errors: {
    handleAll: (handlers?: ErrorHandlers) =>
      invoke(handleAll, { query, handlers }),
  },
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MutationTools = (mutation: Mutation<any, any, any>) => ({
  errors: {
    handleAll: (handlers?: ErrorHandlers) =>
      invoke(handleAll, { mutation, handlers }),
  },
})
