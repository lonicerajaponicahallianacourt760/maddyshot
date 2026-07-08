import { useRef, useState, useMemo, useEffect, useCallback } from 'react'
import { highlightCode } from '../lib/shiki'
import { normalizePersian, detectLineDirection, generateLineNumbers, WINDOW_BUTTONS_SVG } from '../lib/text'
import { copyToClipboard, exportImage } from '../lib/export'
import type { AppSettings } from '../lib/state'
import type { ToastItem } from '../App'

type PreviewProps = AppSettings & {
  onToast: (t: Omit<ToastItem, 'id'>) => void
}

export default function Preview(props: PreviewProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [html, setHtml] = useState('')

  const bgStyle = useMemo(() => {
    if (props.bgType === 'transparent') return {}
    if (props.bgType === 'gradient') return { background: props.bgGradient }
    return { background: props.bgColor }
  }, [props.bgType, props.bgGradient, props.bgColor])

  useEffect(() => {
    if (!props.code.trim()) { setHtml(''); return }
    let cancelled = false
    highlightCode(normalizePersian(props.code), props.language, props.theme).then((h) => {
      if (!cancelled) setHtml(h)
    })
    return () => { cancelled = true }
  }, [props.code, props.language, props.theme])

  const lines = useMemo(() => props.code.split('\n'), [props.code])
  const lineNumbers = useMemo(() => generateLineNumbers(lines.length), [lines.length])
  const digitWidth = useMemo(() => String(lines.length).length, [lines.length])

  const dir = useMemo(() => {
    const dirs = lines.map((l) => detectLineDirection(l))
    return dirs.some((d) => d === 'rtl') ? 'rtl' : 'ltr'
  }, [lines])

  const parsedHtml = useMemo(() => {
    if (!html) return ''
    return html.replace(
      /<pre[^>]*id="[^"]*"[^>]*>/,
      (match) => match.replace('>', ` dir="${dir}" style="unicode-bidi:plaintext;text-align:${dir === 'rtl' ? 'right' : 'left'};direction:${dir}">`)
    )
  }, [html, dir])

  const handleCopy = useCallback(async () => {
    if (!cardRef.current) return
    try {
      await copyToClipboard(cardRef.current)
      props.onToast({ message: 'تصویر با موفقیت کپی شد', type: 'success' })
    } catch {
      props.onToast({ message: 'کپی تصویر پشتیبانی نشد، لطفاً از دکمه دانلود استفاده کنید', type: 'info' })
    }
  }, [props.onToast])

  const handleCopyRaw = useCallback(() => {
    navigator.clipboard.writeText(props.code).then(() => {
      props.onToast({ message: 'کد منبع کپی شد', type: 'success' })
    })
  }, [props.code, props.onToast])

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return
    try {
      const dataUrl = await exportImage(cardRef.current, { format: props.imageFormat, scale: 2 })
      const ext = props.imageFormat === 'jpeg' ? 'jpg' : 'png'
      const link = document.createElement('a')
      link.download = `maddyshot.${ext}`
      link.href = dataUrl
      link.click()
      props.onToast({ message: `تصویر با فرمت ${props.imageFormat.toUpperCase()} دانلود شد`, type: 'success' })
    } catch {
      props.onToast({ message: 'خطا در دانلود تصویر', type: 'info' })
    }
  }, [props.imageFormat, props.onToast])

  return (
    <div className="flex flex-col gap-4">
      <div className="relative animate-slide-up">
        <div
          ref={cardRef}
          style={{
            ...bgStyle,
            padding: props.padding,
            borderRadius: props.borderRadius,
            boxShadow: props.showShadow ? '0 24px 48px -12px rgba(0,0,0,0.6)' : 'none',
            fontFamily: props.fontFamily,
            fontSize: `${props.fontSize}px`,
          }}
          className="relative overflow-hidden transition-all duration-300"
        >
          {props.showWindowControls && (
            <div className="mb-4 flex items-center gap-3">
              <div dangerouslySetInnerHTML={{ __html: WINDOW_BUTTONS_SVG }} />
            </div>
          )}

          <div className="flex" style={{ direction: 'ltr' }}>
            {props.showLineNumbers && (
              <div
                className="flex-shrink-0 select-none text-right leading-relaxed opacity-40"
                style={{
                  width: `${Math.max(2, digitWidth)}ch`,
                  paddingRight: '1.25em',
                  fontSize: `${props.fontSize}px`,
                  unicodeBidi: 'plaintext',
                }}
              >
                <div className="text-zinc-500">
                  {lineNumbers.map((n, i) => (
                    <div key={i} style={{ lineHeight: '1.65' }}>{n}</div>
                  ))}
                </div>
              </div>
            )}
            <div className="min-w-0 flex-1 leading-relaxed" style={{ direction: dir, unicodeBidi: 'plaintext', textAlign: dir === 'rtl' ? 'right' : 'left' }}>
              {parsedHtml ? (
                <div dangerouslySetInnerHTML={{ __html: parsedHtml }} />
              ) : props.code.trim() ? (
                <pre className="m-0 text-zinc-400" style={{ fontSize: `${props.fontSize}px` }}>
                  <code>{props.code}</code>
                </pre>
              ) : (
                <div className="flex items-center justify-center py-12 text-sm text-zinc-700">
                  <span className="text-center">کد یا متن خودت رو در بخش ورودی وارد کن</span>
                </div>
              )}
            </div>
          </div>

          {props.showWatermark && props.code.trim() && (
            <div
              className="absolute bottom-3 left-0 right-0 text-center text-[10px] font-medium tracking-widest opacity-30"
              style={{ color: dir === 'rtl' ? '#fff' : '#fff' }}
            >
              maddyShot
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          onClick={handleCopyRaw}
          disabled={!props.code.trim()}
          className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-xs text-zinc-600 transition-all hover:border-zinc-700 hover:text-zinc-400 disabled:opacity-30"
        >
          Copy Code
        </button>
        <button
          onClick={handleCopy}
          disabled={!props.code.trim()}
          className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-xs text-zinc-600 transition-all hover:border-zinc-700 hover:text-zinc-400 disabled:opacity-30"
        >
          Copy Image
        </button>
        <button
          onClick={handleDownload}
          disabled={!props.code.trim()}
          className="rounded-lg bg-zinc-100 px-5 py-2 text-xs font-medium text-zinc-900 transition-all hover:bg-white disabled:opacity-30 shadow-glow"
        >
          دانلود {props.imageFormat.toUpperCase()}
        </button>
      </div>
    </div>
  )
}
