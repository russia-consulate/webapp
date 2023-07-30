import wretch from 'wretch'
import QueryStringAddon from 'wretch/addons/queryString'
import { NetworkException } from '../shared/exceptions'

const { CLIENT_API_URL, CLIENT_DEV_INIT_DATA } = window.ENV

export const api = wretch(CLIENT_API_URL + '/webapp')
  .addon(QueryStringAddon)
  .headers({
    'telegram-init-data': CLIENT_DEV_INIT_DATA || Telegram.WebApp.initData,
  })
  .catcher(404, () => {
    throw new NetworkException('NotFound')
  })
  .catcher(429, () => {
    throw new NetworkException('TooManyRequests')
  })
