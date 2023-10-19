import clsx from 'clsx'
import toast, {
  Renderable,
  Toast,
  ToastType,
  ValueFunction,
} from 'react-hot-toast'
import { Icon, Typography } from '../../index'
import css from './styles.module.css'

function mapTypeToIcon(type: ToastType) {
  if (type === 'error')
    return (
      <Icon
        name="cross-circle"
        className={clsx(css.icon, 'text-failure')}
        size={32}
      />
    )

  if (type === 'success')
    return (
      <Icon
        name="checkmark-circle"
        className={clsx(css.icon, 'text-[#21C02E]')}
        size={32}
      />
    )

  return (
    <Icon
      name="time-circle"
      className={clsx(css.icon, 'text-blue-900')}
      size={32}
    />
  )
}

export const createNotificationComponent =
  (type: ToastType, message: string): ValueFunction<Renderable, Toast> =>
  ({ id, visible }) => {
    const icon = mapTypeToIcon(type)

    return (
      <div
        className={clsx(css.notification)}
        role="button"
        tabIndex={-1}
        data-visible={visible}
        onClick={() => toast.dismiss(id)}
      >
        {icon}
        <Typography.Paragraph
          color="primary"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </div>
    )
  }
