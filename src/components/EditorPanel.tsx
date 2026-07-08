import { useMemo } from 'react'
import { LANG_NAMES } from '../lib/shiki'
import { getCodeStats } from '../lib/text'

type EditorProps = {
  code: string
  language: string
  fontSize: number
  tabSize: number
  onChange: (code: string) => void
  onLanguageChange: (lang: string) => void
}

function detectLanguage(text: string): string {
  const patterns: [RegExp, string][] = [
    [/import\s+.*\s+from\s+|export\s+(default\s+)?(function|class|const)|interface\s+\w+|type\s+\w+\s*=/, 'typescript'],
    [/function\s+\w+\s*\(|const\s+\w+\s*=\s*\(|=>\s*{/, 'javascript'],
    [/fn\s+\w+|let\s+mut\s+|use\s+\w+::|impl\s+\w+/, 'rust'],
    [/def\s+\w+\s*\(|import\s+\w+|from\s+\w+\s+import/, 'python'],
    [/package\s+\w+|import\s+java\.|public\s+(class|static)/, 'java'],
    [/<\w+>\s*\(|#include\s+<|int\s+main\s*\(/, 'c'],
    [/namespace\s+\w+|using\s+System|Console\.(Write|Read)/, 'csharp'],
    [/fun\s+\w+|val\s+\w+|var\s+\w+/, 'kotlin'],
  ]
  for (const [regex, lang] of patterns) {
    if (regex.test(text)) return lang
  }
  return ''
}

export default function EditorPanel({ code, language, fontSize, tabSize, onChange, onLanguageChange }: EditorProps) {
  const stats = useMemo(() => getCodeStats(code), [code])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-zinc-500">کد یا متن</label>
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="rounded-lg border border-zinc-800 bg-zinc-900/80 px-2.5 py-1.5 text-xs text-zinc-500 outline-none transition-colors hover:border-zinc-700 focus:border-zinc-600"
        >
          <option value="">Auto detect</option>
          {LANG_NAMES.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>
      <textarea
        value={code}
        onChange={(e) => {
          const val = e.target.value
          onChange(val)
          if (!language && val) {
            const detected = detectLanguage(val)
            if (detected) onLanguageChange(detected)
          }
        }}
        placeholder="کد یا متن خودت رو اینجا بچسبون..."
        className="min-h-[200px] w-full resize-y rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 font-mono leading-relaxed text-zinc-200 outline-none transition-all placeholder:text-zinc-700 focus:border-zinc-700 focus:bg-zinc-900/80"
        style={{ fontSize: `${fontSize}px`, tabSize }}
        spellCheck={false}
      />
      <div className="flex items-center gap-4 text-[11px] text-zinc-600">
        {stats.lines > 0 && (
          <>
            <span>{stats.lines} line{stats.lines !== 1 ? 's' : ''}</span>
            <span>{stats.words} word{stats.words !== 1 ? 's' : ''}</span>
            <span>{stats.chars} char{stats.chars !== 1 ? 's' : ''}</span>
          </>
        )}
      </div>
    </div>
  )
}
