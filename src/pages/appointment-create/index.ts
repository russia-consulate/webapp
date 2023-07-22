import { routes } from '@routing/shared'
import { RouteRecord } from '@routing/shared/types'
import { createRouteView } from 'atomic-router-react'
import { AppStatusPage } from '../shared'
import { appLoadedRoute } from './model'
import { AppointmentCreatePage } from './page'

export const AppointmentCreateRoute: RouteRecord = {
  route: routes.appointmentCreate,
  view: createRouteView({
    route: appLoadedRoute,
    view: AppointmentCreatePage,
    otherwise: AppStatusPage,
  }),
}
