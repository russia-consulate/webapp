import { createQuery } from '@farfetched/core'
import { WebAppApi } from '@shared/api'
import { User } from '@shared/api/webapp/types'
import { createEffect, sample } from 'effector'
import { H } from 'highlight.run'

const identifyUserFx = createEffect((user: User) => {
  H.identify(user.id, {
    highlightDisplayName: `${user.first_name} ${user.last_name}`,
    initialized: user.initialized,
  })
})

export const query = createQuery({
  name: 'user',
  effect: WebAppApi.getUserFx,
})

export const $user = query.$data.map((user) => {
  return user
})

export const $initialized = $user.map((user) => {
  return user?.initialized ?? false
})

sample({
  source: $user,
  filter: Boolean,
  target: identifyUserFx,
})
