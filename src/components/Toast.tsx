type ToastItem = {
  id: number
  message: string
  type: 'success' | 'info'
  exiting?: boolean
}

type ToastProps = {
  items: ToastItem[]
}

const ICONS: Record<string, string> = {
  success: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  info: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5"/><path d="M8 5v3.5M8 11v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
}

export default function Toast({ items }: ToastProps) {
  if (!items.length) return null

  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2">
      {items.map((t) => (
        <div
          key={t.id}
          style={{ animation: t.exiting ? 'toast-out 0.2s ease-in forwards' : 'toast-in 0.25s cubic-bezier(0.16,1,0.3,1) forwards' }}
          className={`flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm shadow-lg ${
            t.type === 'success'
              ? 'border-green-500/20 bg-green-500/10 text-green-400'
              : 'border-zinc-600/20 bg-zinc-800/90 text-zinc-300'
          }`}
        >
          <span dangerouslySetInnerHTML={{ __html: ICONS[t.type] }} />
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  )
}

export type { ToastItem }
