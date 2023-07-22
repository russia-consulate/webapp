import { routes } from '@routing/shared'
import { RouteRecord } from '@routing/shared/types'
import { createRouteView } from 'atomic-router-react'
import { AppStatusPage } from '../shared'
import { appLoadedRoute } from './model'
import { AppointmentsPage } from './page'

export const AppointmentsRoute: RouteRecord = {
  route: routes.appointments,
  view: createRouteView({
    route: appLoadedRoute,
    view: AppointmentsPage,
    otherwise: AppStatusPage,
  }),
}
