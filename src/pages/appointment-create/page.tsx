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
  Typography,
} from '@shared/ui'
import { BaseTemplate } from '@templates/base'
import { Header } from '@widgets/header'
import { useUnit } from 'effector-react'
import { Fragment } from 'react'
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
  goToConsulateStep,
  goToRequestInfoStep,
  priceQuery,
  View,
} from './model'
import styles from './styles.module.css'
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

  if (view === View.TechnicalIssue) return <ServiceNotWorkingPage />
  if (view === View.ConsulateStep) return <ConsulateStep />
  if (view === View.RequestInfoStep) return <RequestInfoStep form={form} />
  if (view === View.Confirmation) return <Confirmation />
  if (view === View.Done) return <Done />
  return null
}

const ConsulateStep = () => {
  const fromHome = useUnit($fromHome)
  useBackRoute(fromHome ? routes.home : routes.appointments)

  const selectedConsulateId = useUnit($selectedConsulateId)

  const consulates = useUnit(consulatesQuery)

  if (consulates.pending) {
    const skeleton = <Skeleton type="block" height={56} radius={16} />

    return (
      <BaseTemplate>
        <Header title="Выберите консульство" />
        <Container className="my-2 flex flex-col gap-2">
          {skeleton}
          {skeleton}
          {skeleton}
        </Container>
      </BaseTemplate>
    )
  }

  if (consulates.data.length === 0) {
    return (
      <BaseTemplate>
        <ResultCard
          title="Запись недоступна"
          description={[
            <Fragment key={1}>
              На данный момент возможность создавать новые записи отключена. Но
              это никак не&nbsp;влияет на&nbsp;активные записи - они
              обрабатываются в&nbsp;прежнем режиме.
            </Fragment>,
          ]}
          actions={
            <Fragment>
              <ButtonLink to="/">Вернуться на главную</ButtonLink>
            </Fragment>
          }
        />
      </BaseTemplate>
    )
  }

  return (
    <BaseTemplate>
      <Header title="Выберите консульство" />
      <Container className="my-2 flex flex-col gap-2">
        {consulates.data.map((consulate) => {
          return (
            <button
              key={consulate.id}
              className={styles.consulateOption}
              onClick={() => consulateSelected(consulate.id)}
              data-selected={consulate.id === selectedConsulateId}
            >
              {consulate.country}, {consulate.city}
            </button>
          )
        })}
      </Container>
      {selectedConsulateId && (
        <StickyActions>
          <Button onClick={goToRequestInfoStep} fluid={true}>
            Продолжить
          </Button>
        </StickyActions>
      )}
    </BaseTemplate>
  )
}

const RequestInfoStep = ({ form }: { form: UseFormReturn<FormValues> }) => {
  useBackAction(goToConsulateStep)

  const selectedConsulate = useUnit($selectedConsulate)!
  const requestLink = `https://${selectedConsulate.kdmidPath}.kdmid.ru/queue/visitor.aspx`

  const handleSubmit = form.handleSubmit(formSubmitted)

  return (
    <BaseTemplate>
      <Header title="Заполните данные" />
      <form className="my-2" onSubmit={handleSubmit}>
        <Container className="flex flex-col gap-4">
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
        <RequestInfoSubmitButton form={form} />
      </form>
    </BaseTemplate>
  )
}

const Confirmation = () => {
  useBackAction(goToRequestInfoStep)

  const price = useUnit(priceQuery)
  const createMutation = useUnit(appointmentCreateMutation)

  if (price.pending) {
    return (
      <BaseTemplate>
        <Header title="Подтвердите запись" />
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
      </BaseTemplate>
    )
  }

  return (
    <BaseTemplate>
      <Header title="Подтвердите запись" />
      <ResultCard
        title="Подтверждение записи"
        description={[
          <Fragment key={1}>
            Стоимость услуги составит{' '}
            <span className="font-bold">
              {formatRUB(price.data?.value ?? 0)}
            </span>
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
    </BaseTemplate>
  )
}

const Done = () => {
  useBackRoute(routes.appointments)

  return (
    <BaseTemplate>
      <ResultCard
        title="Запись создана"
        description={[
          <Fragment key={1}>
            Счёт на&nbsp;оплату отправлен вам в&nbsp;личные сообщения
          </Fragment>,
        ]}
        actions={
          <Fragment>
            <Button onClick={() => Telegram.WebApp.close()}>
              Перейти в чат
            </Button>
            <ButtonLink to={routes.appointments} variant="outline">
              Вернуться к записям
            </ButtonLink>
          </Fragment>
        }
      />
    </BaseTemplate>
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

const RequestInfoSubmitButton = ({ form }: PropsWithForm) => {
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
