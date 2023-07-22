import { Appointment, AppointmentStatus } from '@shared/api/webapp/types'
import { Container, Skeleton, Tag, Typography } from '@shared/ui'
import { TagSkeleton } from '@shared/ui/data-display/tag'
import plural from 'plural-ru'

interface Props {
  appointment: Appointment
}

export const AppointmentCard = ({ appointment }: Props) => {
  return (
    <Container className="border border-neutral-900 border-opacity-[15%]">
      {appointment.status === AppointmentStatus.NotPayed && (
        <Tag color="orange" icon="time-circle">
          Ожидает оплаты
        </Tag>
      )}
      {appointment.status === AppointmentStatus.InQueue && (
        <Tag color="blue" icon="wait-circle">
          В очереди
        </Tag>
      )}
      {appointment.status === AppointmentStatus.Done && (
        <Tag color="green" icon="checkmark-circle">
          Запись выполнена
        </Tag>
      )}
      <h3 className="mt-2 font-semibold leading-tight break-words">
        Запись {appointment.requestId}
      </h3>
      {appointment.serviceName && (
        <Typography.Paragraph className="mt-1">
          {appointment.serviceName}
        </Typography.Paragraph>
      )}
      {appointment.status === AppointmentStatus.InQueue && (
        <ul className="mt-4 -mb-4 -mx-4 border-neutral-900 border-opacity-[10%] border-t-[1px] text-sm">
          <li className="px-4 py-3 flex justify-between gap-3">
            <Typography.Paragraph>Перед вами:</Typography.Paragraph>
            <Typography.Paragraph color="primary">
              {plural(
                appointment.queueNumber - 1,
                '%d человек',
                '%d человека',
                '%d человек',
              )}
            </Typography.Paragraph>
          </li>
          {appointment.daysRemaining && (
            <li className="px-4 py-3 flex justify-between gap-3 border-neutral-900 border-opacity-[10%] border-t-[1px]">
              <Typography.Paragraph>До записи осталось:</Typography.Paragraph>
              <Typography.Paragraph color="primary">
                ~
                {plural(
                  appointment.daysRemaining,
                  '%d день',
                  '%d дня',
                  '%d дней',
                )}
              </Typography.Paragraph>
            </li>
          )}
        </ul>
      )}
      {appointment.status === AppointmentStatus.Done && (
        <ul className="mt-4 -mb-4 -mx-4 border-neutral-900 border-opacity-[10%] border-t-[1px] text-sm">
          <li className="px-4 py-3 flex justify-between gap-3">
            <span className="opacity-60">Дата:</span>
            <span>{appointment.date}</span>
          </li>
        </ul>
      )}
    </Container>
  )
}

export const AppointmentCardSkeleton = () => {
  return (
    <Container className="border border-neutral-900 border-opacity-[5%]">
      <TagSkeleton />
      <h3 className="mt-2 font-semibold leading-tight break-words">
        <Skeleton type="inline" width={170} />
      </h3>
    </Container>
  )
}
