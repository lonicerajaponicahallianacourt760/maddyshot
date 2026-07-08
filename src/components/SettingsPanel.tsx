import type { AppSettings } from '../lib/state'
import { THEME_NAMES, THEME_LABELS } from '../lib/shiki'
import { IMAGE_SIZE_PRESETS } from '../lib/state'
import type { ThemeName } from '../lib/shiki'

type SettingsProps = AppSettings & {
  onChange: (s: Partial<AppSettings>) => void
  onReset: () => void
}

const GRADIENTS = [
  { name: 'شب', colors: '#1e1e2e → #2a2a3e', value: 'linear-gradient(135deg, #1e1e2e, #2a2a3e)' },
  { name: 'دریایی', colors: '#0a1628 → #0f2b5e', value: 'linear-gradient(135deg, #0a1628, #0f2b5e)' },
  { name: 'بنفش', colors: '#1a1a2e → #16213e', value: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)' },
  { name: 'خورشیدی', colors: '#1a0a00 → #3d1a00', value: 'linear-gradient(135deg, #1a0a00, #3d1a00)' },
  { name: 'جنگلی', colors: '#0a1a0a → #0d2818', value: 'linear-gradient(135deg, #0a1a0a, #0d2818)' },
  { name: 'رز', colors: '#1a0a14 → #2d1b2e', value: 'linear-gradient(135deg, #1a0a14, #2d1b2e)' },
  { name: 'طلایی', colors: '#1a1400 → #2d2600', value: 'linear-gradient(135deg, #1a1400, #2d2600)' },
  { name: 'نقره‌ای', colors: '#18181b → #27272a', value: 'linear-gradient(135deg, #18181b, #27272a)' },
]

const SOLID_COLORS = [
  '#0d0d0d', '#1e1e2e', '#0f172a', '#18181b', '#1c1917',
  '#f5f0e8', '#ffffff', '#fef3c7', '#fce7f3', '#e0e7ff',
]

const FONTS = [
  { name: 'Vazirmatn', value: 'Vazirmatn, system-ui, sans-serif' },
  { name: 'JetBrains Mono', value: '"JetBrains Mono", monospace' },
  { name: 'Fira Code', value: '"Fira Code", monospace' },
  { name: 'IBM Plex Mono', value: '"IBM Plex Mono", monospace' },
]

const SECTION_ICONS: Record<string, string> = {
  'پس زمینه': `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.3"/><rect x="4" y="4" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.2"/></svg>`,
  'تم و فونت': `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="7" cy="7" r="2.5" stroke="currentColor" stroke-width="1.3"/></svg>`,
  'حاشیه و ابعاد': `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.3"/><path d="M5 1L5 13M9 1L9 13" stroke="currentColor" stroke-width="0.8" opacity="0.3"/></svg>`,
  'نمایش': `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2.5C3 2.5 1 7 1 7s2 4.5 6 4.5 6-4.5 6-4.5-2-4.5-6-4.5z" stroke="currentColor" stroke-width="1.3"/><circle cx="7" cy="7" r="2" stroke="currentColor" stroke-width="1.3"/></svg>`,
  'خروجی': `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 11v1.5h12V11" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="animate-fade-in">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-zinc-600" dangerouslySetInnerHTML={{ __html: SECTION_ICONS[title] || '' }} />
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-600">{title}</p>
      </div>
      {children}
    </div>
  )
}

type BtnProps = { active: boolean; children: React.ReactNode; onClick: () => void; className?: string }
function Btn({ active, children, onClick, className = '' }: BtnProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border px-3 py-1.5 text-xs transition-all duration-200 ${
        active
          ? 'border-zinc-500 bg-zinc-800 text-zinc-200 shadow-sm'
          : 'border-zinc-800 bg-transparent text-zinc-600 hover:border-zinc-700 hover:text-zinc-400'
      } ${className}`}
    >
      {children}
    </button>
  )
}

export default function SettingsPanel(props: SettingsProps) {
  const { onChange, onReset, ...s } = props

  const handlePresetGradient = (gradCss: string) => {
    onChange({ bgGradient: gradCss, bgType: 'gradient' })
  }

  return (
    <div className="flex flex-col gap-6">
      <Section title="پس زمینه">
        <div className="mb-3 flex gap-2">
          {(['solid', 'gradient', 'transparent'] as const).map((t) => (
            <button
              key={t}
              onClick={() => onChange({ bgType: t })}
              className={`flex-1 rounded-lg border py-1.5 text-xs transition-all duration-200 ${
                s.bgType === t
                  ? 'border-zinc-600 bg-zinc-800 text-zinc-200'
                  : 'border-zinc-800 text-zinc-600 hover:border-zinc-700'
              }`}
            >
              {{ solid: 'ثابت', gradient: 'گرادیانت', transparent: 'شفاف' }[t]}
            </button>
          ))}
        </div>

        {s.bgType === 'gradient' && (
          <div className="animate-fade-in">
            <div className="mb-2 grid grid-cols-4 gap-2">
              {GRADIENTS.map((g) => (
                <button
                  key={g.value}
                  onClick={() => handlePresetGradient(g.value)}
                  className={`group relative h-10 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                    s.bgGradient === g.value ? 'border-green-500/50 scale-105' : 'border-transparent hover:border-zinc-700'
                  }`}
                  style={{ background: g.value }}
                  title={g.name}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-[9px] font-medium text-white/80 opacity-0 transition-opacity group-hover:opacity-100">
                    {g.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {s.bgType === 'solid' && (
          <div className="animate-fade-in">
            <div className="flex flex-wrap gap-2">
              {SOLID_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => onChange({ bgColor: c })}
                  className={`h-8 w-8 rounded-lg border-2 transition-all duration-200 ${
                    s.bgColor === c ? 'border-green-500 scale-110' : 'border-transparent hover:border-zinc-700'
                  }`}
                  style={{ background: c }}
                />
              ))}
            </div>
            <input
              type="color"
              value={s.bgColor}
              onChange={(e) => onChange({ bgColor: e.target.value })}
              className="mt-2 h-7 w-full cursor-pointer rounded-lg border-0 bg-transparent"
            />
          </div>
        )}
      </Section>

      <Section title="تم و فونت">
        <div className="mb-3">
          <p className="mb-1.5 text-[11px] text-zinc-600">تم رنگ syntax</p>
          <div className="flex max-h-[120px] flex-wrap gap-1.5 overflow-y-auto scrollbar-thin">
            {THEME_NAMES.map((t) => (
              <button
                key={t}
                onClick={() => onChange({ theme: t as ThemeName })}
                className={`rounded-md border px-2 py-1 text-[11px] transition-all duration-200 ${
                  s.theme === t
                    ? 'border-zinc-500 bg-zinc-800 text-zinc-200'
                    : 'border-zinc-800 text-zinc-600 hover:border-zinc-700'
                }`}
              >
                {THEME_LABELS[t]}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-2">
          <p className="mb-1.5 text-[11px] text-zinc-600">فونت</p>
          <div className="flex flex-wrap gap-1.5">
            {FONTS.map((f) => (
              <button
                key={f.value}
                onClick={() => onChange({ fontFamily: f.value })}
                className={`rounded-md border px-2.5 py-1 text-[11px] transition-all duration-200 ${
                  s.fontFamily === f.value
                    ? 'border-zinc-500 bg-zinc-800 text-zinc-200'
                    : 'border-zinc-800 text-zinc-600 hover:border-zinc-700'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-1.5 text-[11px] text-zinc-600">اندازه فونت: {s.fontSize}px</p>
          <input
            type="range"
            min={10}
            max={24}
            step={1}
            value={s.fontSize}
            onChange={(e) => onChange({ fontSize: Number(e.target.value) })}
          />
        </div>
      </Section>

      <Section title="حاشیه و ابعاد">
        <div className="mb-3">
          <p className="mb-1.5 text-[11px] text-zinc-600">حاشیه داخلی: {s.padding}px</p>
          <input
            type="range"
            min={16}
            max={96}
            step={8}
            value={s.padding}
            onChange={(e) => onChange({ padding: Number(e.target.value) })}
          />
        </div>
        <div className="mb-3">
          <p className="mb-1.5 text-[11px] text-zinc-600">گردی گوشه: {s.borderRadius}px</p>
          <input
            type="range"
            min={0}
            max={32}
            step={4}
            value={s.borderRadius}
            onChange={(e) => onChange({ borderRadius: Number(e.target.value) })}
          />
        </div>
        <div>
          <p className="mb-1.5 text-[11px] text-zinc-600">نسبت تصویر خروجی</p>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(IMAGE_SIZE_PRESETS).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => onChange({ imageSize: key as AppSettings['imageSize'] })}
                className={`rounded-md border px-2.5 py-1 text-[11px] transition-all duration-200 ${
                  s.imageSize === key
                    ? 'border-zinc-500 bg-zinc-800 text-zinc-200'
                    : 'border-zinc-800 text-zinc-600 hover:border-zinc-700'
                }`}
              >
                {preset?.label ?? 'Auto'}
              </button>
            ))}
          </div>
        </div>
      </Section>

      <Section title="نمایش">
        <div className="flex flex-col gap-2">
          <Toggle checked={s.showWindowControls} onChange={(v) => onChange({ showWindowControls: v })} label="دکمه‌های پنجره (macOS)" />
          <Toggle checked={s.showShadow} onChange={(v) => onChange({ showShadow: v })} label="سایه کارت" />
          <Toggle checked={s.showLineNumbers} onChange={(v) => onChange({ showLineNumbers: v })} label="شماره خطوط" />
          <Toggle checked={s.showWatermark} onChange={(v) => onChange({ showWatermark: v })} label="واترمارک maddyShot" />
        </div>
      </Section>

      <Section title="خروجی">
        <div className="flex items-center gap-2">
          <Btn active={s.imageFormat === 'png'} onClick={() => onChange({ imageFormat: 'png' })}>PNG</Btn>
          <Btn active={s.imageFormat === 'jpeg'} onClick={() => onChange({ imageFormat: 'jpeg' })}>JPEG</Btn>
          <div className="flex-1" />
          <button
            onClick={onReset}
            className="rounded-lg border border-zinc-800 px-2.5 py-1.5 text-[11px] text-zinc-600 transition-all hover:border-zinc-700 hover:text-zinc-400"
          >
            بازنشانی
          </button>
        </div>
      </Section>
    </div>
  )
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-zinc-500 transition-colors hover:text-zinc-400">
      <div
        onClick={(e) => { e.preventDefault(); onChange(!checked) }}
        className={`relative h-5 w-9 flex-shrink-0 rounded-full transition-colors duration-200 ${
          checked ? 'bg-green-500/30' : 'bg-zinc-800'
        }`}
      >
        <div
          className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full transition-all duration-200 ${
            checked ? 'translate-x-4 bg-green-500 shadow-sm' : 'translate-x-0 bg-zinc-500'
          }`}
        />
      </div>
      <span className="select-none">{label}</span>
    </label>
  )
}
