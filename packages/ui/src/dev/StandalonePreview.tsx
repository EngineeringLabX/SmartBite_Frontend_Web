import { useState, type ComponentType } from 'react'

type StandalonePreviewProps = {
  title: string
  pages: Record<string, ComponentType>
}

/**
 * Dev-only harness so a remote team can run its pages without the shell
 * (no sign-in, no shell layout). Switch pages with the buttons.
 */
export function StandalonePreview({ title, pages }: StandalonePreviewProps) {
  const names = Object.keys(pages)
  const [current, setCurrent] = useState(names[0])
  const Page = pages[current]

  return (
    <div style={{ maxWidth: 1100, margin: '32px auto', padding: '0 16px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginBottom: 16, color: '#fff' }}>
        <strong style={{ marginRight: 8 }}>{title} · standalone</strong>
        {names.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setCurrent(name)}
            style={{
              padding: '6px 12px',
              borderRadius: 999,
              border: 0,
              cursor: 'pointer',
              font: 'inherit',
              background: name === current ? '#fff' : 'rgb(255 255 255 / 0.15)',
              color: name === current ? '#13202e' : '#fff',
            }}
          >
            {name}
          </button>
        ))}
      </div>
      <div style={{ padding: 32, background: 'var(--card)', borderRadius: 24 }}>
        <Page />
      </div>
    </div>
  )
}
