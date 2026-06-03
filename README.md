# Aditya Yadav — Developer Portfolio

A modern, high-end, animated developer portfolio built with **React + Framer Motion**.  
Designed to Awwwards-level standards — scroll-based storytelling, parallax, micro-interactions, and a clean futuristic aesthetic.

---

## 🚀 Quick Start

```bash
# 1. Navigate into the folder
cd aditya-portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open in browser
http://localhost:5173
```

---

## 📁 Folder Structure

```
aditya-portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Animations/
│   │   │   ├── AnimatedText.jsx     # Char/word stagger, marquee text
│   │   │   ├── ScrollLine.jsx       # Animated SVG line that draws on scroll
│   │   │   └── ParallaxColumns.jsx  # Multi-speed parallax skill columns
│   │   ├── Navbar.jsx               # Sticky nav with mobile menu
│   │   ├── Hero.jsx                 # Canvas particles, role switcher, big type
│   │   ├── About.jsx                # Bio, badges, scroll line integration
│   │   ├── Skills.jsx               # Tabbed skill bars + exploring section
│   │   ├── Projects.jsx             # Cards with parallax sidebar
│   │   ├── Process.jsx              # How I Think — step accordion
│   │   ├── Stats.jsx                # Counters, marquee, certifications
│   │   └── Contact.jsx              # Big CTA, email hover, socials
│   ├── data/
│   │   └── data.js                  # ← ALL content lives here (easy to edit)
│   ├── styles/
│   │   └── globals.css              # CSS variables, fonts, base styles
│   ├── App.jsx                      # Root: scroll progress bar + cursor glow
│   └── main.jsx                     # React entry point
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#f5f5f0` |
| Text | `#0d0d0d` |
| Accent | `#a3e635` (lime green) |
| Accent Dark | `#65a30d` |
| Heading Font | Bebas Neue |
| Body Font | DM Sans |
| Mono Font | DM Mono |

---

## ✏️ How to Customize

All content is in **`src/data/data.js`** — edit name, bio, projects, skills, etc.

```js
// src/data/data.js
export const personal = {
  name: "Aditya Yadav",
  email: "iamaditya1176@gmail.com",
  // ... change anything here
};
```

To change the accent color, edit `src/styles/globals.css`:
```css
:root {
  --accent: #a3e635;       /* Main lime green */
  --accent-dark: #65a30d;  /* Darker shade */
}
```

---

## ⚡ Features

- **Scroll progress bar** — top of page, lime green gradient
- **Canvas particle background** — subtle drifting dots in hero
- **Animated role switcher** — cycles through Frontend Dev, UI/UX, etc.
- **Scroll-following SVG line** — draws itself as you scroll through About
- **Parallax columns** — multi-speed skill columns in Projects sidebar
- **Character-by-character text reveal** — Bebas Neue headings animate in
- **Tabbed skill bars** — Core / Styling / Tools with animated fill bars
- **Step accordion** — clickable "How I Think" process section
- **Animated counters** — stats count up when scrolled into view
- **Marquee ticker** — scrolling tech stack text in Stats section
- **Email hover animation** — dark fill + arrow rotate on contact CTA
- **Cursor glow** — subtle radial gradient follows mouse (desktop only)
- **Mobile menu** — animated hamburger with staggered links

---

## 🏗️ Build for Production

```bash
npm run build
# Output in /dist — deploy to Vercel, Netlify, or GitHub Pages
```

### Deploy to Vercel (recommended):
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify:
Drag and drop the `/dist` folder at netlify.com/drop

---

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `react` + `react-dom` | UI framework |
| `framer-motion` | All animations & transitions |
| `vite` | Lightning-fast dev server & bundler |
| `tailwindcss` | Utility CSS (used selectively) |

---

Built with ❤️ by Aditya Yadav
