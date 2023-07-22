import clsx from 'clsx'
import { SVGProps } from 'react'
import { SpritesMap } from './sprites.generated'

// Merging all icons as `SPRITE_NAME/SPRITE_ICON_NAME`
export type IconName = {
  [Key in keyof SpritesMap]: `${Key}/${SpritesMap[Key]}`
}[keyof SpritesMap]

export interface IconProps
  extends Omit<SVGProps<SVGSVGElement>, 'name' | 'type'> {
  name: IconName
  size: number | string
}

export const Icon = ({
  name,
  size,
  className,
  viewBox,
  ...props
}: IconProps) => {
  const [spriteName, iconName] = name.split('/')

  return (
    <svg
      className={clsx(className, 'select-none inline-block')}
      style={{ width: size, height: size }}
      viewBox={viewBox}
      focusable="false"
      aria-hidden
      {...props}
    >
      <use href={`/${spriteName}.svg#${iconName}`} />
    </svg>
  )
}
