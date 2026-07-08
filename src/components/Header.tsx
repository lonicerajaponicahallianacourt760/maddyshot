type HeaderProps = {
  theme: string
  onThemeChange: (t: string) => void
}

const THEME_LABELS: Record<string, string> = {
  'vitesse-dark': 'Dark',
  'vitesse-light': 'Light',
  nord: 'Nord',
  monokai: 'Monokai',
  'min-light': 'Min Light',
  'github-light': 'GitHub',
  'one-dark-pro': 'One Dark',
  dracula: 'Dracula',
}

export default function Header({ theme, onThemeChange }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-zinc-800 px-6 py-3">
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold tracking-tight text-white">maddyShot</span>
        <span className="hidden sm:inline text-xs text-zinc-500">کدت رو به تصویر تبدیل کن</span>
      </div>
      <select
        value={theme}
        onChange={(e) => onThemeChange(e.target.value)}
        className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-300 outline-none focus:border-zinc-500"
      >
        {Object.entries(THEME_LABELS).map(([key, label]) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </select>
    </header>
  )
}
