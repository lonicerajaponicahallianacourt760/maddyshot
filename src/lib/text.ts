const ARABIC_TO_PERSIAN: Record<string, string> = {
  'ي': 'ی',
  'ك': 'ک',
  '٤': '۴',
  '٥': '۵',
  '٦': '۶',
}

const PERSIAN_NUMBERS: Record<string, string> = {
  '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
  '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
  '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
  '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
}

export function normalizePersian(text: string): string {
  let result = ''
  for (const ch of text) {
    result += ARABIC_TO_PERSIAN[ch] ?? PERSIAN_NUMBERS[ch] ?? ch
  }
  return result
}

const RTL_CHARS = /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u08A0-\u08FF\uFB1D-\uFDFF\uFE70-\uFEFF]/

export function hasRTL(text: string): boolean {
  return RTL_CHARS.test(text)
}

export function detectLineDirection(line: string): 'ltr' | 'rtl' {
  let rtlScore = 0
  let ltrScore = 0
  for (const ch of line) {
    if (RTL_CHARS.test(ch)) rtlScore++
    else if (/[a-zA-Z0-9=+\-*/{}();,.\[\]<>!@#$%^&|~`'"]/.test(ch)) ltrScore++
  }
  return rtlScore > ltrScore && rtlScore > 2 ? 'rtl' : 'ltr'
}

export function detectCodeDirection(code: string): 'ltr' | 'rtl' {
  const lines = code.split('\n')
  const dirs = lines.map(detectLineDirection)
  return dirs.some((d) => d === 'rtl') ? 'rtl' : 'ltr'
}

export function generateLineNumbers(count: number, start = 1): string[] {
  return Array.from({ length: count }, (_, i) => String(start + i))
}

export function getCodeStats(code: string): { lines: number; words: number; chars: number } {
  const trimmed = code.trim()
  return {
    lines: trimmed ? code.split('\n').length : 0,
    words: trimmed ? trimmed.split(/\s+/).length : 0,
    chars: trimmed.length,
  }
}

export function applyImageSize(code: string, width?: number, height?: number): string {
  if (!width || !height) return code
  const lines = code.split('\n')
  const maxLines = Math.max(1, Math.floor((height - 120) / 22))
  if (lines.length <= maxLines) return code
  const half = Math.floor(maxLines / 2)
  const top = lines.slice(0, half)
  const bottom = lines.slice(lines.length - half)
  return [...top, `// ... ${lines.length - maxLines} more lines`, ...bottom].join('\n')
}

export const WINDOW_BUTTONS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 14" width="54" height="14"><circle cx="7" cy="7" r="6" fill="#ff5f56"/><circle cx="27" cy="7" r="6" fill="#ffbd2e"/><circle cx="47" cy="7" r="6" fill="#27c93f"/></svg>`
