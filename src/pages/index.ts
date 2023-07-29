import { createRoutesView } from 'atomic-router-react'
import { AppointmentCreateRoute } from './appointment-create'
import { AppointmentsRoute } from './appointments'
import { FaqRoute } from './faq'
import { HomeRoute } from './home'
import { NotFoundPage } from './not-found'

export const Pages = createRoutesView({
  routes: [HomeRoute, AppointmentsRoute, AppointmentCreateRoute, FaqRoute],
  otherwise: NotFoundPage,
})
