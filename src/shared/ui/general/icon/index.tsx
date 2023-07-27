import clsx from 'clsx'
import { SVGProps } from 'react'
import { SPRITES_META, SpritesMap } from './sprites.generated'

export type IconName = SpritesMap['sprite']

export interface IconProps
  extends Omit<SVGProps<SVGSVGElement>, 'name' | 'type'> {
  name: IconName
  size?: number | string
}

export const Icon = ({
  name,
  size,
  width = size,
  height = size,
  viewBox,
  className,
  ...rest
}: IconProps) => {
  const { filePath, items } = SPRITES_META.sprite
  const original = items[name]

  return (
    <svg
      className={clsx(className, 'select-none inline-block')}
      focusable="false"
      aria-hidden
      width={width || original.width}
      height={height || original.height}
      viewBox={viewBox || original.viewBox}
      {...rest}
    >
      <use href={`/${filePath}#${name}`} />
    </svg>
  )
}
