<div align="center">

# 🌊 Aura Wave

**An immersive, interactive landing page featuring dynamic floating wave shaders**

Built with React 19, Three.js, and Tailwind CSS — powered by a real-time WebGL shader background, a liquid-glass control panel, and optional AI-driven theme generation via the Gemini API.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.185-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](#-license)
[![Node](https://img.shields.io/badge/Node-%3E%3D18-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](#-contributing)

</div>

---

## ✨ Overview

**Aura Wave** is a premium, GPU-accelerated landing page built around a custom **Three.js / GLSL shader** that renders three layers of animated, gradient-lit "floating lines." The scene reacts to cursor movement, supports mouse-driven distortion physics, and ships with a fully interactive **liquid-glass settings panel** that lets users customize colors, wave density, animation speed, and physics in real time.

An optional Express + Gemini API backend allows the wave theme to be adjusted through natural-language prompts — describe a mood ("volcano," "aurora borealis," "cyberpunk") and the AI generates a matching color palette and animation profile.

---

## 🎬 Preview

<div align="center">

*Interactive shader waves · Liquid-glass UI · Real-time customization*

</div>

---

## 🚀 Features

- 🌈 **Dynamic Shader Background** — Custom GLSL fragment shader rendering three independently configurable wave layers (top / middle / bottom)
- 🖱️ **Cursor Physics** — Mouse-reactive "bend" distortion with adjustable radius and strength (attract or repel)
- 🪟 **Liquid Glass UI** — Frosted-glass navigation bar and settings drawer with smooth spring animations via Framer Motion
- 🎨 **5 Curated Presets** — Cyber Neon, Aurora Borealis, Solar Flare, Deep Ocean Abyss, and Obsidian Slate
- 🎲 **Randomizer** — One-click "Algorithmic Scrambler" to generate a fresh random palette and wave configuration
- 🧭 **Live Control Panel** — Tabbed interface (Presets / Waves / Physics) with sliders for line count, spacing, speed, bend radius, and parallax strength
- 🤖 **AI Theme Generation** *(optional)* — Gemini-powered `/api/chat` endpoint that converts natural-language prompts into shader parameters
- 📱 **Fully Responsive** — Adaptive layout and typography from mobile to large desktop viewports
- ⚡ **Fast Dev Loop** — Vite-powered development server with instant HMR

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + TypeScript |
| **Build Tool** | Vite 6 |
| **3D / Shaders** | Three.js (raw WebGL + GLSL) |
| **Styling** | Tailwind CSS v4 |
| **Animation** | Motion (Framer Motion) |
| **Icons** | Lucide React |
| **Backend** | Express + tsx |
| **AI Integration** | Google Gemini API (`@google/genai`) |

---

## 📦 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- A **Gemini API key** (optional — only required for the AI theme-generation feature)

### Installation

```bash
# Clone the repository
git clone https://github.com/mustafizur-web/aura-wave.git
cd aura-wave

# Install dependencies
npm install
```

### Environment Setup

Create a `.env.local` file in the project root (see `.env.example` for reference):

```env
GEMINI_API_KEY="your_gemini_api_key_here"
```

> 💡 The app runs perfectly fine **without** a Gemini key — you'll simply lose access to the AI-driven "Customize Animation" chat feature and can still use presets, sliders, and the randomizer.

### Run in Development

```bash
npm run dev
```

The app will be available at **`http://localhost:3000`**.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
aura-wave/
├── src/
│   ├── components/
│   │   └── FloatingLines.tsx   # Three.js shader canvas & wave logic
│   ├── App.tsx                 # Main UI: hero, navbar, settings panel
│   ├── main.tsx                # React entry point
│   └── index.css               # Global styles & glassmorphism utilities
├── server.ts                   # Express server + Gemini API route
├── index.html                  # HTML entry point
├── metadata.json                # App metadata
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
└── .env.example                  # Environment variable reference
```

---

## ⚙️ Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Bundle the app and compile the server for production |
| `npm start` | Run the production build |
| `npm run clean` | Remove the `dist` output directory |
| `npm run lint` | Type-check the project with `tsc --noEmit` |

---

## 🎛️ Customization

The floating wave shader is fully configurable via the in-app settings panel, or programmatically through the `FloatingLines` component props:

| Prop | Type | Description |
|---|---|---|
| `linesGradient` | `string[]` | Array of hex colors for the gradient blend |
| `animationSpeed` | `number` | Overall animation velocity |
| `enabledWaves` | `("top" \| "middle" \| "bottom")[]` | Which wave layers are active |
| `lineCount` | `number[]` | Line density per layer |
| `lineDistance` | `number[]` | Spacing between lines per layer |
| `interactive` | `boolean` | Enables cursor-based distortion |
| `bendRadius` / `bendStrength` | `number` | Controls the cursor's influence field |
| `parallax` / `parallaxStrength` | `boolean` / `number` | Scroll & hover parallax motion |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

**Built by [Mustafizur Rahman](https://github.com/mustafizur-web)**

⭐ If you like this project, consider giving it a star!

</div>
