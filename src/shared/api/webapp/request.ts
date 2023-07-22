import axios, { AxiosRequestConfig } from 'axios'
import { NetworkException } from '../shared/exceptions'

enum Headers {
  InitData = 'telegram-init-data',
}

const instance = axios.create({
  baseURL: window.ENV.CLIENT_API_URL + '/webapp',
  headers: {
    [Headers.InitData]:
      Telegram.WebApp.initData || window.ENV.CLIENT_DEV_INIT_DATA,
  },
})

export async function request<T>(options: AxiosRequestConfig): Promise<T> {
  try {
    const response = await instance<T>(options)
    return response.data
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw error
    }

    if (error.response?.status === 404) {
      throw new NetworkException('NotFound')
    }

    if (error.response?.status === 429) {
      throw new NetworkException('TooManyRequests')
    }

    throw error
  }
}
