import { routes } from '@routing/shared'
import { RouteRecord } from '@routing/shared/types'
import { FaqPage } from './page'

export const FaqRoute: RouteRecord = {
  route: routes.faq,
  view: FaqPage,
}
