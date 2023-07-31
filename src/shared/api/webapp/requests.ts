import { createEffect } from 'effector'
import { api } from './api'
import { Appointment, Consulate, Price, User } from './types'

export const getUserFx = createEffect(() => {
  return api.url('/user').get().json<User>()
})

export const getAppointmentsFx = createEffect(() => {
  return api.url('/appointments').get().json<Appointment[]>()
})

export const getAppointmentPriceFx = createEffect(
  (payload: { consulateId: string }) => {
    return api.url('/appointments/price').query(payload).get().json<Price>()
  },
)

export interface CreateAppointmentPayload {
  consulateId: string
  requestId: string
  requestSecurityCode: string
}

export const createAppointmentFx = createEffect(
  (payload: CreateAppointmentPayload) => {
    return api.url('/appointments/create').post(payload).res()
  },
)

export const sendAppointmentInvoiceFx = createEffect(
  (payload: { appointmentId: string }) => {
    return api
      .url(`/appointments/${payload.appointmentId}/send-invoice`)
      .post(payload)
      .json()
  },
)

export const getConsulatesFx = createEffect(() => {
  return api.url('/consulates').get().json<Consulate[]>()
})
