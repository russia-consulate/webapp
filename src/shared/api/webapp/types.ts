export interface DatabaseUser {
  id: string
  telegramId: string
}

export interface ParsedTelegramUser {
  id: number
  first_name: string
  last_name: string
  language_code: string
}

export type InitializedWebAppUser = Omit<ParsedTelegramUser, 'id'> & {
  id: string
  initialized: true
  inDatabase: DatabaseUser
}

export type UnknownWebAppUser = Omit<ParsedTelegramUser, 'id'> & {
  id: string
  initialized: false
}

export type User = InitializedWebAppUser | UnknownWebAppUser

export interface Consulate {
  id: string
  city: string
  country: string
  kdmidPath: string
}

interface AppointmentCommon {
  id: string
  link: string
  createdAt: string
  serviceName?: string
  consulate: Consulate
  requestId: string
}

type AppointmentByStatus =
  | { status: AppointmentStatus.Done; date: string; doneAt: string }
  | { status: AppointmentStatus.NotPayed }
  | { status: AppointmentStatus.Refunded }
  | {
      status: AppointmentStatus.InQueue
      queueNumber: number
      daysRemaining: number
    }

export type Appointment = AppointmentCommon & AppointmentByStatus

export interface Price {
  value: number
}

export enum AppointmentStatus {
  NotPayed = 'NotPayed',
  InQueue = 'InQueue',
  Done = 'Done',
  Refunded = 'Refunded',
}
