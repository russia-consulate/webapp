import { router, routes } from '@routing/shared'
import { createEffect, createEvent, sample } from 'effector'
import { History } from 'history'
import { condition } from 'patronum'

export const actionRef = {
  current: (history: History) => history.back(),
}

export const clicked = createEvent<unknown>()

const goBackFx = createEffect((history: History) => actionRef.current(history))
const showBackButtonFx = createEffect(() => Telegram.WebApp.BackButton.show())
const hideBackButtonFx = createEffect(() => Telegram.WebApp.BackButton.hide())

export const setupFx = createEffect(() => {
  Telegram.WebApp.BackButton.onClick(clicked)
})

condition({
  source: routes.home.$isOpened,
  if: Boolean,
  then: hideBackButtonFx,
  else: showBackButtonFx,
})

sample({
  clock: clicked,
  source: router.$history,
  target: goBackFx,
})
