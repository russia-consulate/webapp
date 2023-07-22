import { routes } from '@routing/shared'
import { RouteRecord } from '@routing/shared/types'
import { createRouteView } from 'atomic-router-react'
import { AppStatusPage } from '../shared'
import { appLoadedRoute } from './model'
import { HomePage } from './page'

export const HomeRoute: RouteRecord = {
  route: routes.home,
  view: createRouteView({
    route: appLoadedRoute,
    view: HomePage,
    otherwise: AppStatusPage,
  }),
}
