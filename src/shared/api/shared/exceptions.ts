export type NetworkExceptionType = 'TooManyRequests' | 'NotFound' | 'Unknown'

export class NetworkException extends Error {
  type: NetworkExceptionType

  constructor(type: NetworkExceptionType) {
    super(`${type} network exception has occured`)
    this.type = type
  }
}
