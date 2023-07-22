import { $$goBack } from '@features/go-back'
import { history, router } from '@routing/shared'
import { createEvent, sample } from 'effector'

export const appStarted = createEvent()

/*
 * Router initialization
 * Should be called using sample to execute route.opened events at the correct time
 *
 * When called synchronously before rendering -
 * - route.opened events will be executed before pages' sample initialization,
 * resulting in broken logic flow
 */
sample({
  clock: appStarted,
  fn: () => history,
  target: router.setHistory,
})

/*
 * Sync with Telegram's Web App BackButton
 */
sample({
  clock: appStarted,
  target: $$goBack.setupFx,
})
