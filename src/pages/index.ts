import { createRoutesView } from 'atomic-router-react'
import { AppointmentCreateRoute } from './appointment-create'
import { AppointmentsRoute } from './appointments'
import { FaqRoute } from './faq'
import { HomeRoute } from './home'

export const Pages = createRoutesView({
  routes: [HomeRoute, AppointmentsRoute, AppointmentCreateRoute, FaqRoute],
})
