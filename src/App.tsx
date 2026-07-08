import { useState, useCallback, useRef } from 'react'
import { DEFAULT_SETTINGS, type AppSettings } from './lib/state'
import { THEME_LABELS } from './lib/shiki'
import type { ThemeName } from './lib/shiki'
import EditorPanel from './components/EditorPanel'
import SettingsPanel from './components/SettingsPanel'
import Preview from './components/Preview'
import Toast from './components/Toast'
import type { ToastItem } from './components/Toast'

let toastId = 0

export default function App() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS)
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map())

  const update = useCallback((partial: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }))
  }, [])

  const reset = useCallback(() => {
    setSettings(DEFAULT_SETTINGS)
    addToast({ message: 'تنظیمات به حالت اولیه بازگشت', type: 'info' })
  }, [])

  const addToast = useCallback((t: Omit<ToastItem, 'id'>) => {
    const id = ++toastId
    setToasts((prev) => [...prev, { ...t, id }])
    const timer = setTimeout(() => {
      setToasts((prev) => prev.map((x) => x.id === id ? { ...x, exiting: true } : x))
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== id))
        timers.current.delete(id)
      }, 200)
    }, 2500)
    timers.current.set(id, timer)
  }, [])

  return (
    <div className="flex min-h-svh flex-col bg-zinc-950">
      <header className="flex items-center justify-between border-b border-zinc-800/50 bg-zinc-950/80 px-4 py-2.5 backdrop-blur-lg sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 text-zinc-600 transition-all hover:border-zinc-700 hover:text-zinc-400 lg:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <div className="flex items-center gap-2.5">
            <span className="text-lg font-bold tracking-tight text-white">maddyShot</span>
            <span className="hidden sm:inline text-[11px] text-zinc-700">کدت رو به تصویر تبدیل کن</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/50 px-2.5 py-1.5 sm:flex">
            <span className="text-[11px] text-zinc-600">تم فعلی:</span>
            <span className="text-[11px] text-zinc-400">{THEME_LABELS[settings.theme]}</span>
          </div>
          <select
            value={settings.theme}
            onChange={(e) => update({ theme: e.target.value as ThemeName })}
            className="rounded-lg border border-zinc-800 bg-zinc-900/80 px-2.5 py-1.5 text-xs text-zinc-500 outline-none transition-all hover:border-zinc-700 focus:border-zinc-600"
          >
            {Object.entries(THEME_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </header>

      <main className="flex flex-1">
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed inset-y-0 left-0 z-40 w-[340px] border-l border-zinc-800/50 bg-zinc-950/95 p-5 pt-16 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 lg:border-r lg:border-l-0 lg:bg-transparent lg:p-5 lg:pt-5 lg:backdrop-blur-none overflow-y-auto scrollbar-thin`}
        >
          {sidebarOpen && (
            <div className="flex flex-col gap-6">
              <EditorPanel
                code={settings.code}
                language={settings.language}
                fontSize={settings.fontSize}
                tabSize={settings.tabSize}
                onChange={(code) => update({ code })}
                onLanguageChange={(language) => update({ language })}
              />
              <hr className="border-zinc-800/50" />
              <SettingsPanel
                {...settings}
                onChange={update}
                onReset={reset}
              />
            </div>
          )}
          {!sidebarOpen && (
            <div className="hidden lg:flex lg:flex-col lg:gap-6">
              <EditorPanel
                code={settings.code}
                language={settings.language}
                fontSize={settings.fontSize}
                tabSize={settings.tabSize}
                onChange={(code) => update({ code })}
                onLanguageChange={(language) => update({ language })}
              />
              <hr className="border-zinc-800/50" />
              <SettingsPanel
                {...settings}
                onChange={update}
                onReset={reset}
              />
            </div>
          )}
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <section className="flex flex-1 items-start justify-center overflow-auto p-4 sm:p-6 lg:p-10">
          <div className="w-full max-w-3xl">
            <Preview
              {...settings}
              onToast={addToast}
            />
          </div>
        </section>
      </main>

      <Toast items={toasts} />
    </div>
  )
}

export type { ToastItem }
