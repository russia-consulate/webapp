import { useBackAction, useBackRoute } from '@features/go-back'
import { routes } from '@routing/shared'
import { formatRUB } from '@shared/lib/format'
import { onEnter, useError, useFilled } from '@shared/lib/forms'
import {
  Button,
  ButtonLink,
  ButtonSkeleton,
  Container,
  Input,
  ResultCard,
  Skeleton,
  StickyActions,
  TagSelect,
  Typography,
} from '@shared/ui'
import { BaseTemplate } from '@templates/base'
import { Header } from '@widgets/header'
import { useUnit } from 'effector-react'
import { Fragment, useLayoutEffect } from 'react'
import { useForm, UseFormReturn, useFormState } from 'react-hook-form'
import { ServiceNotWorkingPage } from '../shared'
import {
  $fromHome,
  $selectedConsulate,
  $selectedConsulateId,
  $view,
  appointmentCreateMutation,
  confirmed,
  consulateSelected,
  consulatesQuery,
  formSubmitted,
  goBackToForm,
  priceQuery,
  View,
} from './model'
import { FormValues } from './types'

export const AppointmentCreatePage = () => {
  const view = useUnit($view)

  const form = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      requestId: '',
      requestSecurityCode: '',
    },
    shouldFocusError: false,
  })

  if (view === View.TechnicalIssue) {
    return <ServiceNotWorkingPage />
  }

  return (
    <BaseTemplate>
      <Header title="Запись в консульство" />
      <section className="grow py-2 flex flex-col">
        {view === View.Form && <Form form={form} />}
        {view === View.Confirmation && <Confirmation />}
        {view === View.Done && <Done />}
      </section>
    </BaseTemplate>
  )
}

const Form = ({ form }: { form: UseFormReturn<FormValues> }) => {
  const fromHome = useUnit($fromHome)
  useBackRoute(fromHome ? routes.home : routes.appointments)

  const selectedConsulateId = useUnit($selectedConsulateId)
  const selectedConsulate = useUnit($selectedConsulate)

  const consulates = useUnit(consulatesQuery)

  const consulateOptions = consulates.data?.map((consulate) => ({
    label: `${consulate.country}, ${consulate.city}`,
    value: consulate.id,
  }))

  const requestLink = `https://${selectedConsulate?.kdmidPath}.kdmid.ru/queue/visitor.aspx`

  const handleSubmit = form.handleSubmit(formSubmitted)

  return (
    <div className="grow flex flex-col gap-2" onSubmit={handleSubmit}>
      <Container>
        <Typography.Heading font="text" size="base">
          Выберите консульство
        </Typography.Heading>
        <TagSelect
          className="mt-3"
          value={selectedConsulateId}
          onChange={consulateSelected}
          options={consulateOptions ?? []}
          skeleton={consulates.pending}
        />
      </Container>

      {selectedConsulate && (
        <form onSubmit={handleSubmit}>
          <Container className="flex flex-col gap-4">
            <Typography.Heading font="text" size="base">
              Заполните данные заявки
            </Typography.Heading>
            <div className="flex flex-col gap-2">
              <RequestId form={form} />
              <RequestSecurityCode form={form} />
            </div>
            <Typography.Paragraph className="px-3">
              Данные можно найти, перейдя по&nbsp;ссылке из&nbsp;письма, которое
              приходит после регистрации заявки на&nbsp;kdmid.ru
            </Typography.Paragraph>
            <Typography.Paragraph className="px-3">
              Если вы еще не&nbsp;создавали заявку на&nbsp;kdmid.ru -
              зарегистрируйтесь по&nbsp;
              <a className="text-blue-900" href={requestLink} target="_blank">
                этой&nbsp;ссылке
              </a>{' '}
              и подтвердите заявку, перейдя по&nbsp;ссылке из&nbsp;письма
            </Typography.Paragraph>
            <Typography.Paragraph className="px-3">
              Заранее предупреждаем: письмо от kdmid.ru может идти очень долго
            </Typography.Paragraph>
          </Container>
          <SubmitButton form={form} />
        </form>
      )}
    </div>
  )
}

const Confirmation = () => {
  useBackAction(goBackToForm)

  const price = useUnit(priceQuery)
  const createMutation = useUnit(appointmentCreateMutation)

  if (price.pending) {
    return (
      <ResultCard
        title={<Skeleton type="inline" width={280} />}
        description={[
          <Fragment key={1}>
            <Skeleton type="inline" width={230} />
          </Fragment>,
          <Fragment key={2}>
            <Skeleton type="inline" width={250} />
            <Skeleton type="inline" />
            <Skeleton type="inline" width={265} />
            <Skeleton type="inline" width={160} />
          </Fragment>,
        ]}
        actions={
          <Fragment>
            <ButtonSkeleton />
            <ButtonSkeleton />
          </Fragment>
        }
      />
    )
  }

  return (
    <ResultCard
      title="Подтверждение записи"
      description={[
        <Fragment key={1}>
          Стоимость услуги составит{' '}
          <span className="font-bold">{formatRUB(price.data?.value ?? 0)}</span>
        </Fragment>,
        <Fragment key={2}>
          Счёт на&nbsp;оплату будет отправлен вам в&nbsp;личные сообщения.
          Для&nbsp;продолжения нужно будет перейти в&nbsp;чат с&nbsp;ботом и
          вызвать окно оплаты
        </Fragment>,
      ]}
      actions={
        <Fragment>
          <Button
            onClick={confirmed}
            loading={createMutation.pending}
            loadingText="Создаем запись"
          >
            Создать запись
          </Button>
          <ButtonLink to={routes.appointments} variant="outline">
            Вернуться к записям
          </ButtonLink>
        </Fragment>
      }
    />
  )
}

const Done = () => {
  useBackRoute(routes.appointments)

  return (
    <ResultCard
      title="Запись создана"
      description={[
        <Fragment key={1}>
          Счёт на&nbsp;оплату отправлен вам в&nbsp;личные сообщения
        </Fragment>,
      ]}
      actions={
        <Fragment>
          <Button onClick={() => Telegram.WebApp.close()}>Перейти в чат</Button>
          <ButtonLink to={routes.appointments} variant="outline">
            Вернуться к записям
          </ButtonLink>
        </Fragment>
      }
    />
  )
}

interface PropsWithForm {
  form: UseFormReturn<FormValues>
}

export const RequestId = ({ form }: PropsWithForm) => {
  const input = form.register('requestId', {
    validate: (value) => (value ? true : 'Нужно заполнить'),
  })

  const filled = useFilled(form, 'requestId')
  const error = useError(form, 'requestId')

  return (
    <Input
      placeholder="Номер заявки"
      filled={filled}
      error={error?.message}
      onKeyDown={onEnter.moveFocus(form, 'requestSecurityCode')}
      {...input}
    />
  )
}

export const RequestSecurityCode = ({ form }: PropsWithForm) => {
  const input = form.register('requestSecurityCode', {
    validate: (value) => {
      if (value) return true
      return 'Нужно заполнить'
    },
  })

  const filled = useFilled(form, 'requestSecurityCode')
  const error = useError(form, 'requestSecurityCode')

  return (
    <Input
      placeholder="Защитный код"
      filled={filled}
      error={error?.message}
      {...input}
    />
  )
}

const SubmitButton = ({ form }: PropsWithForm) => {
  const { dirtyFields, isValid } = useFormState({
    control: form.control,
  })

  const canBeSubmitted =
    dirtyFields.requestId && dirtyFields.requestSecurityCode && isValid

  if (!canBeSubmitted) {
    return null
  }

  return (
    <StickyActions>
      <Button type="submit" fluid={true}>
        Продолжить
      </Button>
    </StickyActions>
  )
}
