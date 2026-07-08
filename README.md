# maddyShot 📸

> **Turn your code into beautiful, shareable images — with full RTL and Persian support.**

maddyShot is a client-side tool that converts code or text into polished images. Unlike Carbon, Ray.so, or CodeImage, it handles **RTL text, Persian typography, and bidirectional code** correctly so Persian-speaking developers can share beautiful code screenshots without fighting layout bugs.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Syntax Highlighting** | 16 themes powered by Shiki (VS Code's engine), 22+ languages |
| **RTL / BiDi Support** | Automatic direction detection, `unicode-bidi: plaintext`, Persian text normalization |
| **Customizable Background** | 8 gradients, 10 solid colors, transparent mode, color picker |
| **Typography** | Vazirmatn, JetBrains Mono, Fira Code, IBM Plex Mono with adjustable font size |
| **Export** | PNG (2x retina) & JPEG with image size presets (Twitter, Instagram, OG) |
| **Line Numbers** | Toggle on/off with dynamic digit width |
| **Window Controls** | macOS-style traffic light dots |
| **Watermark** | Optional maddyShot branding |
| **Stats Bar** | Real-time line, word, and character count |
| **Toast Notifications** | Visual feedback on download and copy |
| **Responsive** | Collapsible sidebar, works on mobile |
| **Zero Server** | Fully client-side — no backend, no data leaves your browser |

### Supported Languages

TypeScript, JavaScript, JSX, TSX, Python, Rust, Go, HTML, CSS, JSON, YAML, Markdown, Bash, SQL, Java, C, C++, Ruby, PHP, Swift, Kotlin, Solidity + auto-detection.

### Available Themes

Vitesse Dark/Light, Nord, Min Light, Monokai, GitHub Light, One Dark Pro, Dracula, Dracula Soft, Synthwave 84, Night Owl, Tokyo Night, Rose Pine Moon, Catppuccin Mocha, Everforest Dark, Ayu Dark.

---

## 🚀 Getting Started

```bash
# Clone
git clone https://github.com/Maddyrampant/maddyshot.git
cd maddyshot

# Install
npm install

# Dev
npm run dev

# Build for production
npm run build
```

Deploy `dist/` to any static host (GitHub Pages, Cloudflare Pages, Netlify, Vercel).

---

## 🧠 Why maddyShot?

Existing tools (Carbon, Ray.so, CodeImage) handle Persian/RTL text poorly:

- ❌ Wrong text direction (LTR instead of RTL)
- ❌ Broken Persian comments inside code (BiDi reordering)
- ❌ No high-quality Persian font support
- ❌ Arabic/Persian digits rendered incorrectly

maddyShot fixes all of these while matching or exceeding the visual quality of existing tools.

---

## 🏗 Architecture

```
                     ┌──────────────────────┐
                     │     maddyShot SPA     │
                     ├──────────────────────┤
                     │  React 19 + Tailwind  │
                     │  ├─ Editor Panel      │
                     │  ├─ Settings Panel    │
                     │  └─ Preview Canvas    │
                     ├──────────────────────┤
                     │  Shiki (syntax hl)    │
                     │  html-to-image (png)  │
                     │  RTL/BiDi Handler     │
                     └──────────────────────┘
```

Zero server: no hosting cost, full privacy, deploy anywhere.

---

## 📦 Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | React 19 + Vite | Fast DX, broad ecosystem |
| Styling | Tailwind CSS v4 | Utility-first, rapid development |
| Syntax Highlight | Shiki v4 | VS Code-grade engine, 16 themes |
| Image Render | html-to-image | DOM → PNG with font support |
| Fonts | Vazirmatn, JetBrains Mono | Persian + monospace, Google Fonts |

---

## 📄 License

MIT © Maddyrampant

---

## 🤝 Contributing

PRs welcome! Focus areas:
- More export formats (SVG)
- Custom themes
- Diff mode
- Browser extension

---

> ساخته شده با ❤️ برای توسعه‌دهنده‌های فارسی‌زبان
