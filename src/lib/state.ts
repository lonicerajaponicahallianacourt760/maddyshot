import type { ThemeName } from './shiki'

export interface AppSettings {
  code: string
  language: string
  theme: ThemeName
  bgType: 'solid' | 'gradient' | 'transparent'
  bgColor: string
  bgGradient: string
  gradientColor1: string
  gradientColor2: string
  gradientAngle: number
  padding: number
  borderRadius: number
  fontFamily: string
  fontSize: number
  showWindowControls: boolean
  showShadow: boolean
  showLineNumbers: boolean
  showWatermark: boolean
  imageFormat: 'png' | 'jpeg'
  imageSize: 'auto' | 'twitter' | 'instagram' | 'og'
  tabSize: number
}

export const DEFAULT_CODE = `// maddyShot — نمونه کد فارسی با RTL
function fibonacci(n: number): number {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

// محاسبه اعداد فیبوناچی تا ۱۰
const result = fibonacci(10)
console.log('نتیجه:', result)

// تابع تبدیل تاریخ به شمسی
function toPersianDate(date: Date): string {
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

console.log(toPersianDate(new Date()))
`

export const DEFAULT_SETTINGS: AppSettings = {
  code: DEFAULT_CODE,
  language: '',
  theme: 'vitesse-dark' as ThemeName,
  bgType: 'gradient',
  bgColor: '#0d0d0d',
  bgGradient: 'linear-gradient(135deg, #1e1e2e, #2a2a3e)',
  gradientColor1: '#1e1e2e',
  gradientColor2: '#2a2a3e',
  gradientAngle: 135,
  padding: 48,
  borderRadius: 16,
  fontFamily: 'Vazirmatn, system-ui, sans-serif',
  fontSize: 14,
  showWindowControls: true,
  showShadow: true,
  showLineNumbers: true,
  showWatermark: false,
  imageFormat: 'png',
  imageSize: 'auto',
  tabSize: 2,
}

export const IMAGE_SIZE_PRESETS: Record<string, { width: number; height: number; label: string } | null> = {
  auto: null,
  twitter: { width: 1200, height: 675, label: 'Twitter (1200×675)' },
  instagram: { width: 1080, height: 1080, label: 'Instagram (1080×1080)' },
  og: { width: 1200, height: 630, label: 'OG Image (1200×630)' },
}
