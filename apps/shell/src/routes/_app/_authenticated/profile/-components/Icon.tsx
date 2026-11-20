type IconProps = {
  name: string
  size?: number
  className?: string
  /** Solid glyph instead of the outline */
  filled?: boolean
}

/** Material Symbols glyph — the font is loaded in index.html */
export function Icon({ name, size = 20, className, filled }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className ?? ''}`}
      style={{ fontSize: size, fontVariationSettings: filled ? "'FILL' 1" : undefined }}
      aria-hidden="true"
    >
      {name}
    </span>
  )
}
