import { $$appointments } from '@entities/appointments'
import { $$user } from '@entities/user'
import { chainAppLoaded } from '@routing/chains'
import { routes } from '@routing/shared'
import { createStore, sample } from 'effector'

export enum View {
  TechnicalIssue,
  ContentLoading,
  Content,
}

export const appLoadedRoute = chainAppLoaded(routes.home)

export const $view = createStore<View | null>(null)

sample({
  clock: appLoadedRoute.opened,
  source: {
    user: $$user.query.$data,
    appointmentsSucceeded: $$appointments.query.$succeeded,
  },
  fn: ({ user, appointmentsSucceeded }) => {
    if (!user) return View.TechnicalIssue
    if (!appointmentsSucceeded) return View.ContentLoading
    return View.Content
  },
  target: $view,
})

sample({
  source: $view,
  filter: (view) => view === View.ContentLoading,
  target: $$appointments.query.refresh,
})

sample({
  clock: $$appointments.query.finished.success,
  fn: () => View.Content,
  target: $view,
})

sample({
  source: $$appointments.query.finished.failure,
  fn: () => View.TechnicalIssue,
  target: $view,
})
