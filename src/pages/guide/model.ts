import { $$appointments } from '@entities/appointments'
import { chainAppLoaded } from '@routing/chains'
import { routes } from '@routing/shared'
import { Appointment, AppointmentStatus } from '@shared/api/webapp/types'
import { createStore, sample } from 'effector'

export enum View {
  TechnicalIssue,
  Loading,
  NoAccess,
  Content,
}

function checkAccess(appointments: Appointment[]) {
  return appointments.some((appointment) => {
    return appointment.status !== AppointmentStatus.NotPayed
  })
}

export const appLoadedRoute = chainAppLoaded(routes.guide)

export const $view = createStore<View | null>(null)

sample({
  clock: appLoadedRoute.opened,
  source: {
    loading: $$appointments.query.$pending,
    appointments: $$appointments.query.$data,
  },
  fn: ({ loading, appointments }) => {
    if (loading) return View.Loading
    return checkAccess(appointments) ? View.Content : View.NoAccess
  },
  target: $view,
})

sample({
  source: $view,
  filter: (view) => view === View.Loading,
  target: $$appointments.query.refresh,
})

sample({
  clock: $$appointments.query.finished.success,
  fn: ({ result }) => (checkAccess(result) ? View.Content : View.NoAccess),
  target: $view,
})

sample({
  source: $$appointments.query.finished.failure,
  fn: () => View.TechnicalIssue,
  target: $view,
})
