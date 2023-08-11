import { $$appointments } from '@entities/appointments'
import { createMutation, createQuery } from '@farfetched/core'
import { chainAppLoaded } from '@routing/chains'
import { routes } from '@routing/shared'
import { WebAppApi } from '@shared/api'
import { MutationTools, QueryTools } from '@shared/lib/farfetched'
import { combine, createEvent, createStore, restore, sample } from 'effector'
import { debug, reset } from 'patronum'
import { FormValues } from './types'

export enum View {
  TechnicalIssue,
  ConsulateStep,
  RequestInfoStep,
  Confirmation,
  Done,
}

export const appLoadedRoute = chainAppLoaded(routes.appointmentCreate)

export const consulatesQuery = createQuery({
  name: 'consulates',
  effect: WebAppApi.getConsulatesFx,
  initialData: [],
})

export const priceQuery = createQuery({
  name: 'appointments/price',
  effect: WebAppApi.getAppointmentPriceFx,
})

export const appointmentCreateMutation = createMutation({
  name: 'appointment/create',
  effect: WebAppApi.createAppointmentFx,
})

QueryTools(consulatesQuery).timeUntilStale(1000 * 60 * 10)
QueryTools(priceQuery).timeUntilStale(1000 * 60 * 5)

MutationTools(appointmentCreateMutation).errors.handleAll({
  TooManyRequests:
    'Заявку можно создавать не&nbsp;чаще 1&nbsp;раза в&nbsp;30&nbsp;минут',
})

sample({
  clock: appointmentCreateMutation.finished.success,
  target: $$appointments.query.start,
})

export const consulateSelected = createEvent<string>()
export const formSubmitted = createEvent<FormValues>()
export const goToConsulateStep = createEvent<unknown>()
export const goToRequestInfoStep = createEvent<unknown>()
export const confirmed = createEvent<unknown>()

export const $view = createStore<View | null>(null)
export const $selectedConsulateId = restore(consulateSelected, null)
export const $formValues = restore(formSubmitted, null)
export const $fromHome = createStore<boolean>(false)

sample({
  source: routes.appointmentCreate.opened,
  fn: ({ query }) => query.fromHome ?? false,
  target: $fromHome,
})

reset({
  clock: routes.appointmentCreate.closed,
  target: [$view, $selectedConsulateId, $formValues, $fromHome],
})

export const $selectedConsulate = combine(
  {
    id: $selectedConsulateId,
    consulates: consulatesQuery.$data,
  },
  ({ id, consulates }) => {
    return consulates.find((item) => item.id === id) ?? null
  },
)

const $createPayload = combine(
  { consulateId: $selectedConsulateId, formValues: $formValues },
  ({ consulateId, formValues }): WebAppApi.CreateAppointmentPayload | null => {
    if (!consulateId) return null
    if (!formValues) return null

    const { requestId, requestSecurityCode } = formValues

    return {
      consulateId,
      requestId,
      requestSecurityCode,
    }
  },
)

sample({
  clock: appLoadedRoute.opened,
  source: consulatesQuery.$failed,
  fn: (consulatesFailed) => {
    if (consulatesFailed) return View.TechnicalIssue
    return View.ConsulateStep
  },
  target: $view,
})

sample({
  clock: formSubmitted,
  fn: () => View.Confirmation,
  target: $view,
})

sample({
  clock: goToConsulateStep,
  fn: () => View.ConsulateStep,
  target: $view,
})

sample({
  clock: goToRequestInfoStep,
  fn: () => View.RequestInfoStep,
  target: $view,
})

sample({
  clock: appointmentCreateMutation.finished.success,
  fn: () => View.Done,
  target: $view,
})

sample({
  clock: [consulatesQuery.finished.failure, priceQuery.finished.failure],
  fn: () => View.TechnicalIssue,
  target: $view,
})

sample({
  source: $view,
  filter: (view) => view === View.ConsulateStep,
  target: consulatesQuery.refresh,
})

sample({
  clock: formSubmitted,
  source: $selectedConsulateId,
  filter: Boolean,
  fn: (consulateId) => ({ consulateId }),
  target: priceQuery.refresh,
})

sample({
  clock: confirmed,
  source: $createPayload,
  filter: Boolean,
  target: appointmentCreateMutation.start,
})
