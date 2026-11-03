type IconProps = {
  name: string
  size?: number
  className?: string
}

/** Material Symbols glyph — the font is loaded in index.html */
export function Icon({ name, size = 20, className }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className ?? ''}`}
      style={{ fontSize: size }}
      aria-hidden="true"
    >
      {name}
    </span>
  )
}
