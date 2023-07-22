import clsx from 'clsx'
import { SVGProps } from 'react'
import { SPRITES_META, SpritesMap } from './sprites.generated'

export type IconName = SpritesMap['sprite']

export interface IconProps
  extends Omit<SVGProps<SVGSVGElement>, 'name' | 'type'> {
  name: IconName
  size: number | string
}

export const Icon = ({
  name,
  size,
  className,
  viewBox: viewBoxFromProps,
  ...props
}: IconProps) => {
  const { filePath, items } = SPRITES_META.sprite
  const { viewBox } = items[name]

  return (
    <svg
      className={clsx(className, 'select-none inline-block')}
      style={{ width: size, height: size }}
      viewBox={viewBoxFromProps ?? viewBox}
      focusable="false"
      aria-hidden
      {...props}
    >
      <use href={`/${filePath}#${name}`} />
    </svg>
  )
}
