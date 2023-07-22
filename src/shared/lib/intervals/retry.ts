import { sleep } from './sleep'

interface Options<T> {
  action: () => T | Promise<T>
  interval?: number
  delay?: number
  maxAttempts?: number
}

export async function retry<T>({
  action,
  interval = 2000,
  delay = 0,
  maxAttempts = 12,
}: Options<T>): Promise<T> {
  let lastError: unknown

  await sleep(delay)

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    if (attempt !== 1) {
      await sleep(interval)
    }

    try {
      return await action()
    } catch (error) {
      lastError = error
    }
  }

  throw lastError
}
