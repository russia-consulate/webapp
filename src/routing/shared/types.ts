import { RouteInstance, RouteParams } from 'atomic-router'
import { ComponentType } from 'react'

export interface RouteRecord<
  Props = object,
  Params extends RouteParams = object,
> {
  route: RouteInstance<Params> | RouteInstance<Params>[]
  view: ComponentType<Props>
}
