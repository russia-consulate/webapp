import clsx from 'clsx'
import toast, {
  Renderable,
  Toast,
  ToastType,
  ValueFunction,
} from 'react-hot-toast'
import { Icon, IconName, Typography } from '../../index'
import css from './styles.module.css'

interface IconConfig {
  name: IconName
  color: string
}

const icons: Record<ToastType, IconConfig> = {
  error: { name: 'cross-circle', color: 'text-failure' },
  success: { name: 'checkmark-circle', color: 'text-[#21C02E]' },
  custom: { name: 'cross-circle', color: 'text-blue-900' },
  loading: { name: 'cross-circle', color: 'text-blue-900' },
  blank: { name: 'cross-circle', color: 'text-blue-900' },
}

export const createNotificationComponent =
  (type: ToastType, message: string): ValueFunction<Renderable, Toast> =>
  ({ id, visible }) => {
    return (
      <div
        className={clsx(css.notification)}
        role="button"
        tabIndex={-1}
        data-visible={visible}
        onClick={() => toast.dismiss(id)}
      >
        <Icon
          className={clsx(css.icon, icons[type].color)}
          name={icons[type].name}
          size={32}
        />
        <Typography.Paragraph
          color="primary"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </div>
    )
  }
