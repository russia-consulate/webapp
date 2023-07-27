import { $$user } from '@entities/user'
import { RouteInstance, RouteParams } from 'atomic-router'
import { and } from 'patronum'
import { createChain } from '../shared/create-chain'

export function chainAppLoaded<T extends RouteParams>(route: RouteInstance<T>) {
  return createChain(route, {
    sources: [
      {
        query: $$user.query,
        succeedIf: and($$user.query.$succeeded, $$user.$initialized),
      },
    ],
  })
}
