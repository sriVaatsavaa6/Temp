# GitHub Constellation 2026 — Sri Vaatsava's Portfolio

A static single-page portfolio website created for **GitHub Constellation 2026**, the world's largest developer gathering.

## 🌌 Features

- **Animated starfield** — canvas-based constellation background with twinkling, drifting stars and connecting lines
- **GitHub-inspired dark theme** — uses GitHub's exact design tokens (`#0d1117`, `#238636`, `#58a6ff`, `#a371f7`)
- **Scroll animations** — elements fade in as you scroll using `IntersectionObserver`
- **Animated counters** — stat numbers count up on scroll
- **Responsive** — fully mobile-friendly layout
- **Sections**: Hero · About · Experience · Projects · Skills · GitHub Stats · Contact

## 🚀 Getting Started

Just open `index.html` in any modern browser — no build step or dependencies required.

```bash
open index.html
# or
python3 -m http.server 8080
```

## 📁 Structure

```
.
├── index.html   # Main HTML (all sections)
├── styles.css   # CSS with GitHub dark theme & animations
└── script.js    # Starfield canvas + scroll-reveal + counters
```

## 🌐 Deploy

Push to GitHub and enable **GitHub Pages** (Settings → Pages → Deploy from branch `main`, folder `/`) to publish instantly.