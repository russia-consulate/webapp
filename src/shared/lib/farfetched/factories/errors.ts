import { Mutation, Query } from '@farfetched/core'
import { NetworkException, NetworkExceptionType } from '@shared/api'
import { createFactory } from '@withease/factories'
import { createEffect, createEvent, sample } from 'effector'
import { H } from 'highlight.run'
import { condition } from 'patronum'
import { $$notification } from '../../../ui'

export type ErrorHandlers = {
  [Type in NetworkExceptionType]?: string
}

interface AnalyticsErrorPayload {
  requestName: string
  params: Record<string, string>
  error: Error
}

const sendErrorToAnalyticsFx = createEffect(
  (payload: AnalyticsErrorPayload) => {
    const { requestName, params, error } = payload

    H.consumeError(error, 'Request Failure', {
      requestName,
      params: JSON.stringify(params),
    })
  },
)

const DEFAULT_HANDLERS: Required<ErrorHandlers> = {
  TooManyRequests: 'Вы делаете запросы слишком часто, повторите попытку позже',
  NotFound: 'Данные не найдены на сервере, свяжитесь с поддержкой',
  Unknown: 'Произошла неизвестная ошибка, свяжитесь с поддержкой',
}

export interface ErrorsHandleAllParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query?: Query<any, any, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutation?: Mutation<any, any, any>
  handlers?: ErrorHandlers
}

export const handleAll = createFactory((params: ErrorsHandleAllParams) => {
  const { query, mutation, handlers = {} } = params
  const queryOrMutation = query || mutation

  if (!queryOrMutation) {
    throw new TypeError('You should provide either Query or Mutation')
  }

  const finalHandlers = { ...DEFAULT_HANDLERS, ...handlers }

  const networkExceptionOccured = createEvent<NetworkException>()

  const gotRequestError = queryOrMutation.finished.failure.map<Error>(
    ({ error }) => error,
  )

  condition({
    source: gotRequestError,
    if: (error) => error instanceof NetworkException,
    then: networkExceptionOccured,
    else: networkExceptionOccured.prepend(
      () => new NetworkException('Unknown'),
    ),
  })

  sample({
    clock: networkExceptionOccured,
    fn: (exception) => finalHandlers[exception.type],
    target: $$notification.failure,
  })

  sample({
    source: queryOrMutation.finished.failure,
    filter: ({ error }) => {
      const isNetwork = error instanceof NetworkException
      const isLimit = isNetwork && error.type === 'TooManyRequests'
      return !isLimit
    },
    fn: ({ params, error }) => ({
      requestName: queryOrMutation.__.meta.name,
      params,
      error,
    }),
    target: sendErrorToAnalyticsFx,
  })
})
