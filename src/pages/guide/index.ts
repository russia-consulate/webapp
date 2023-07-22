import { routes } from '@routing/shared'
import { RouteRecord } from '@routing/shared/types'
import { createRouteView } from 'atomic-router-react'
import { AppStatusPage } from '../shared'
import { appLoadedRoute } from './model'
import { GuidePage } from './page'

export const GuideRoute: RouteRecord = {
  route: routes.guide,
  view: createRouteView({
    route: appLoadedRoute,
    view: GuidePage,
    otherwise: AppStatusPage,
  }),
}
