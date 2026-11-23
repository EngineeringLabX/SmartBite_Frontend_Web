type IconProps = {
  name: string
  size?: number
  className?: string
}

/** Material Symbols glyph. The font is loaded by the shell's index.html (and by this app's index.html when run standalone) */
export function Icon({ name, size = 20, className }: IconProps) {
  return (
    <span className={`material-symbols-outlined ${className ?? ''}`} style={{ fontSize: size }} aria-hidden="true">
      {name}
    </span>
  )
}
