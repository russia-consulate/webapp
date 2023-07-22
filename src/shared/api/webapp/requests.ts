import { createEffect } from 'effector'
import { request } from './request'
import { Appointment, Consulate, Price, User } from './types'

export const getUserFx = createEffect(() => {
  return request<User>({
    url: '/user',
    method: 'GET',
  })
})

export const getAppointmentsFx = createEffect(() => {
  return request<Appointment[]>({
    url: '/appointments',
    method: 'GET',
  })
})

interface GetAppointmentPricePayload {
  consulateId: string
}

export const getAppointmentPriceFx = createEffect(
  (payload: GetAppointmentPricePayload) => {
    return request<Price>({
      url: '/appointments/price',
      method: 'GET',
      params: payload,
    })
  },
)

export interface CreateAppointmentPayload {
  consulateId: string
  requestId: string
  requestSecurityCode: string
}

export const createAppointmentFx = createEffect(
  (payload: CreateAppointmentPayload) => {
    return request<Appointment[]>({
      url: '/appointments/create',
      method: 'POST',
      data: payload,
    })
  },
)

interface SendAppointmentInvoicePayload {
  appointmentId: string
}

export const sendAppointmentInvoiceFx = createEffect(
  (payload: SendAppointmentInvoicePayload) => {
    return request<void>({
      url: `/appointments/${payload.appointmentId}/send-invoice`,
      method: 'POST',
    })
  },
)

export const getConsulatesFx = createEffect(() => {
  return request<Consulate[]>({
    url: '/consulates',
    method: 'GET',
  })
})
