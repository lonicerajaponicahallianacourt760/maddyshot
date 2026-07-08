import { createHighlighter, type Highlighter } from 'shiki'

let highlighter: Highlighter | null = null

const THEMES = [
  'vitesse-dark', 'vitesse-light',
  'nord', 'min-light', 'monokai',
  'github-light', 'one-dark-pro', 'dracula',
  'dracula-soft', 'synthwave-84', 'night-owl',
  'tokyo-night', 'rose-pine-moon', 'catppuccin-mocha',
  'everforest-dark', 'ayu-dark',
] as const

const LANGS = [
  'typescript', 'javascript', 'jsx', 'tsx', 'python', 'rust', 'go',
  'html', 'css', 'json', 'yaml', 'markdown', 'bash', 'sql', 'java',
  'c', 'cpp', 'ruby', 'php', 'swift', 'kotlin', 'solidity',
] as const

export type ThemeName = (typeof THEMES)[number]
export type LangName = (typeof LANGS)[number]

export const THEME_NAMES: ThemeName[] = [...THEMES]
export const LANG_NAMES: LangName[] = [...LANGS]

export const THEME_LABELS: Record<string, string> = {
  'vitesse-dark': 'Vitesse Dark',
  'vitesse-light': 'Vitesse Light',
  nord: 'Nord',
  'min-light': 'Min Light',
  monokai: 'Monokai',
  'github-light': 'GitHub Light',
  'one-dark-pro': 'One Dark Pro',
  dracula: 'Dracula',
  'dracula-soft': 'Dracula Soft',
  'synthwave-84': 'Synthwave 84',
  'night-owl': 'Night Owl',
  'tokyo-night': 'Tokyo Night',
  'rose-pine-moon': 'Rose Pine Moon',
  'catppuccin-mocha': 'Catppuccin Mocha',
  'everforest-dark': 'Everforest',
  'ayu-dark': 'Ayu Dark',
}

export async function getHighlighter(): Promise<Highlighter> {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: [...THEMES],
      langs: [...LANGS],
    })
  }
  return highlighter
}

export async function highlightCode(code: string, lang: string, theme: ThemeName = 'vitesse-dark'): Promise<string> {
  const hl = await getHighlighter()
  try {
    return hl.codeToHtml(code, { lang: lang || 'text', theme })
  } catch {
    return hl.codeToHtml(code, { lang: 'text', theme })
  }
}
