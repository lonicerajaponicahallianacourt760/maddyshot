import { toPng, toJpeg } from 'html-to-image'

export type ImageFormat = 'png' | 'jpeg'

type ExportOptions = {
  format: ImageFormat
  scale: number
  quality?: number
  width?: number
  height?: number
}

export async function exportImage(element: HTMLElement, options: ExportOptions): Promise<string> {
  const { format, scale, quality = 0.92, width, height } = options

  const style = element.style
  const origWidth = style.width
  const origHeight = style.height
  const origOverflow = style.overflow

  if (width) style.width = `${width}px`
  if (height) {
    style.height = `${height}px`
    style.overflow = 'hidden'
  }

  try {
    if (format === 'jpeg') {
      return await toJpeg(element, {
        pixelRatio: scale,
        cacheBust: true,
        quality,
      })
    }
    return await toPng(element, {
      pixelRatio: scale,
      cacheBust: true,
      quality: 1,
    })
  } finally {
    style.width = origWidth
    style.height = origHeight
    style.overflow = origOverflow
  }
}

export async function downloadPNG(element: HTMLElement, filename = 'maddyshot.png', format: ImageFormat = 'png') {
  const dataUrl = await exportImage(element, { format, scale: 2 })
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  link.click()
}

export async function copyToClipboard(element: HTMLElement) {
  const dataUrl = await exportImage(element, { format: 'png', scale: 2 })
  const response = await fetch(dataUrl)
  const blob = await response.blob()
  await navigator.clipboard.write([
    new ClipboardItem({ 'image/png': blob }),
  ])
}
