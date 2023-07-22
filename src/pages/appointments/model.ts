import { $$appointments } from '@entities/appointments'
import { $$user } from '@entities/user'
import { chainAppLoaded } from '@routing/chains'
import { routes } from '@routing/shared'
import { createStore, sample } from 'effector'

export enum View {
  TechnicalIssue,
  Content,
}

export const appLoadedRoute = chainAppLoaded(routes.appointments)

export const $view = createStore<View | null>(null)

sample({
  clock: appLoadedRoute.opened,
  source: $$user.query.$data,
  fn: (user) => {
    if (!user) return View.TechnicalIssue
    return View.Content
  },
  target: $view,
})

sample({
  source: $view,
  filter: (view) => view === View.Content,
  target: $$appointments.query.refresh,
})

sample({
  source: $$appointments.query.finished.failure,
  fn: () => View.TechnicalIssue,
  target: $view,
})
