import React, { useState } from "react";
import { 
  Settings, 
  X, 
  RefreshCw, 
  Activity, 
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import FloatingLines from "./components/FloatingLines";

// Presets that look amazing on the shader background
const PRESETS = [
  {
    name: "Cyber Neon",
    gradient: ["#ff007f", "#9d00ff", "#00ffff", "#002c5c"],
    animationSpeed: 1.4,
    lineCount: [8, 12, 6],
    lineDistance: [4, 6, 5],
    enabledWaves: ["top", "middle", "bottom"] as Array<"top" | "middle" | "bottom">,
    bendStrength: -1.2,
    bendRadius: 6.0
  },
  {
    name: "Aurora Borealis",
    gradient: ["#098c76", "#14d99f", "#6fffe9", "#021226", "#010114"],
    animationSpeed: 1.3,
    lineCount: [8, 12, 8],
    lineDistance: [5, 5, 5],
    enabledWaves: ["top", "middle", "bottom"] as Array<"top" | "middle" | "bottom">,
    bendStrength: -1.0,
    bendRadius: 6.0
  },
  {
    name: "Solar Flare",
    gradient: ["#ff3300", "#ff8800", "#ffd700", "#550000", "#110000"],
    animationSpeed: 1.8,
    lineCount: [6, 14, 4],
    lineDistance: [3, 7, 5],
    enabledWaves: ["top", "middle", "bottom"] as Array<"top" | "middle" | "bottom">,
    bendStrength: -1.5,
    bendRadius: 4.5
  },
  {
    name: "Deep Ocean Abyss",
    gradient: ["#0284c7", "#0369a1", "#0c4a6e", "#0f172a"],
    animationSpeed: 1.1,
    lineCount: [8, 12, 8],
    lineDistance: [5, 5, 5],
    enabledWaves: ["top", "middle", "bottom"] as Array<"top" | "middle" | "bottom">,
    bendStrength: -1.1,
    bendRadius: 6.5
  },
  {
    name: "Obsidian Slate",
    gradient: ["#f8fafc", "#cbd5e1", "#64748b", "#1e293b", "#0f172a"],
    animationSpeed: 0.8,
    lineCount: [8, 8, 8],
    lineDistance: [6, 6, 6],
    enabledWaves: ["top", "middle", "bottom"] as Array<"top" | "middle" | "bottom">,
    bendStrength: -0.6,
    bendRadius: 5.0
  }
];

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 40
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.05,
      delayChildren: 0.2,
    }
  }
};

const letterVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scaleY: 1.15
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scaleY: 1,
    transition: { 
      duration: 0.7, 
      ease: [0.16, 1, 0.3, 1] 
    }
  }
};

export default function App() {
  // Config state for FloatingLines
  const [gradient, setGradient] = useState<string[]>(PRESETS[0].gradient);
  const [animationSpeed, setAnimationSpeed] = useState<number>(PRESETS[0].animationSpeed);
  const [enabledWaves, setEnabledWaves] = useState<Array<"top" | "middle" | "bottom">>(PRESETS[0].enabledWaves);
  const [lineCounts, setLineCounts] = useState<number[]>([8, 12, 6]);
  const [lineDistances, setLineDistances] = useState<number[]>([4, 6, 5]);

  const [interactive, setInteractive] = useState<boolean>(true);
  const [bendRadius, setBendRadius] = useState<number>(6.0);
  const [bendStrength, setBendStrength] = useState<number>(-1.2);
  const [parallax, setParallax] = useState<boolean>(true);
  const [parallaxStrength, setParallaxStrength] = useState<number>(0.3);

  // Settings Panel State
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"presets" | "sliders" | "physics">("presets");
  const [activeNav, setActiveNav] = useState<string>("Home");

  // Load a preset
  const handleLoadPreset = (preset: typeof PRESETS[0]) => {
    setGradient(preset.gradient);
    setAnimationSpeed(preset.animationSpeed);
    setLineCounts(preset.lineCount);
    setLineDistances(preset.lineDistance);
    setEnabledWaves(preset.enabledWaves);
    setBendStrength(preset.bendStrength);
    setBendRadius(preset.bendRadius);
  };

  // Randomize styling
  const handleRandomize = () => {
    const randomHex = () => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const colorsCount = Math.floor(Math.random() * 4) + 3; // 3 to 6 colors
    const newColors = Array.from({ length: colorsCount }, () => randomHex());
    
    setGradient(newColors);
    setAnimationSpeed(parseFloat((Math.random() * 1.8 + 0.3).toFixed(2)));
    setLineCounts([
      Math.floor(Math.random() * 12) + 4,
      Math.floor(Math.random() * 14) + 4,
      Math.floor(Math.random() * 10) + 3
    ]);
    setLineDistances([
      Math.floor(Math.random() * 8) + 3,
      Math.floor(Math.random() * 8) + 3,
      Math.floor(Math.random() * 8) + 3
    ]);
    setBendRadius(parseFloat((Math.random() * 10 + 3).toFixed(1)));
    setBendStrength(parseFloat((Math.random() * 2.0 - 1.0).toFixed(2)));
  };

  return (
    <div className="relative min-h-screen bg-[#030303] text-[#F5F5F5] font-sans flex flex-col justify-between overflow-x-hidden selection:bg-white/20 selection:text-white">
      
      {/* 1. IMMERSIVE INTERACTIVE SHADER BACKGROUND */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-auto">
        <FloatingLines
          linesGradient={gradient}
          enabledWaves={enabledWaves}
          lineCount={lineCounts}
          lineDistance={lineDistances}
          animationSpeed={animationSpeed}
          interactive={interactive}
          bendRadius={bendRadius}
          bendStrength={bendStrength}
          parallax={parallax}
          parallaxStrength={parallaxStrength}
          mixBlendMode="screen"
        />
        {/* Deep background vignetting overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#030303]/45 to-[#030303] pointer-events-none z-1" />
      </div>

      {/* 2. FLOATING LIQUID GLASS NAVIGATION HEADER */}
      <div className="relative z-20 w-full px-4 sm:px-8 pt-6 sm:pt-8 pointer-events-none">
        <header className="max-w-7xl mx-auto rounded-3xl liquid-glass-navbar px-4 sm:px-6 py-3 sm:py-3.5 flex flex-row items-center justify-center pointer-events-auto transition-all duration-300 relative">
          
          {/* MW Monogram Premium Logo on the Left */}
          <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto">
            <div 
              className="mw-logo-container cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center relative w-11 h-11"
              style={{
                '--logo-color-1': gradient[0],
                '--logo-color-2': gradient[1] || gradient[0],
                '--logo-color-3': gradient[2] || gradient[1] || gradient[0],
              } as React.CSSProperties}
            >
              {/* Radial backglow element matching wave colors */}
              <div 
                className="absolute inset-1 rounded-full blur-xl pointer-events-none mw-logo-backglow"
                style={{
                  background: `radial-gradient(circle, ${gradient[0]} 0%, ${gradient[1] || gradient[0]} 50%, transparent 100%)`
                }}
              />
              <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                <path 
                  d="M 22 66 L 22 22 L 46 46 L 70 22 L 70 42" 
                  strokeWidth="7.5" 
                  strokeLinecap="square" 
                  strokeLinejoin="miter" 
                  className="mw-logo-path-cyan"
                />
                <path 
                  d="M 34 58 L 34 78 L 56 54 L 78 78 L 78 34" 
                  strokeWidth="7.5" 
                  strokeLinecap="square" 
                  strokeLinejoin="miter" 
                  className="mw-logo-path-purple"
                />
              </svg>
            </div>
          </div>

          {/* Centered Navigation Menu */}
          <nav className="flex flex-row flex-nowrap items-center justify-center gap-1 sm:gap-2 whitespace-nowrap overflow-x-auto no-scrollbar max-w-[65%] sm:max-w-[75%] md:max-w-none">
            {["Home", "About", "Skills", "Projects", "Services"].map((item) => (
              <span
                key={item}
                onClick={() => setActiveNav(item)}
                className={`nav-link-premium px-2 sm:px-3.5 py-1.5 sm:py-2 text-[9px] sm:text-xs cursor-pointer transition-all whitespace-nowrap ${
                  activeNav === item ? "nav-link-premium-active" : ""
                }`}
              >
                {item}
              </span>
            ))}
            <a 
              href="https://github.com/mustafizur-web" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => setActiveNav("Contact")}
              className={`nav-link-premium px-2 sm:px-3.5 py-1.5 sm:py-2 text-[9px] sm:text-xs cursor-pointer transition-all whitespace-nowrap ${
                activeNav === "Contact" ? "nav-link-premium-active" : ""
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Super Decorated Wave Theme Button on the Right */}
          <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 flex items-center shrink-0">
            <button 
              id="customize-trigger"
              onClick={() => {
                setShowSettings(true);
              }}
              style={{
                backgroundImage: `linear-gradient(270deg, ${gradient.map(c => `${c}cc`).join(', ')})`,
                boxShadow: `0 0 20px ${gradient[0]}55, 0 0 20px ${gradient[1] || gradient[0]}33`
              }}
              className="cta-navbar-premium flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-[9px] sm:text-xs font-black uppercase tracking-widest cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="absolute inset-0 wave-btn-inner-pulse" />
              <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse relative z-10 shrink-0" />
              <span className="relative z-10 font-bold hidden sm:inline">Customize Animation</span>
              <span className="relative z-10 font-bold inline sm:hidden">Customize</span>
            </button>
          </div>

        </header>
      </div>

      {/* 3. HERO LANDING PAGE */}
      <main className="relative z-10 w-full px-6 sm:px-12 flex-grow flex flex-col justify-center items-center py-24 max-w-7xl mx-auto text-center select-none">
        
        {/* HERO TITLE AREA */}
        <div className="flex flex-col justify-center items-center pb-12">
          <motion.h1 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ letterSpacing: "-1px", lineHeight: "1.05" }}
            className="font-orbitron font-[700] uppercase text-white text-6xl sm:text-8xl lg:text-[118px] mb-12 select-none flex flex-col items-center gap-y-3"
          >
            {/* Line 1: CREATIVE */}
            <span className="block overflow-hidden py-1">
              <span className="flex justify-center text-white" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                {Array.from("CREATIVE").map((char, index) => (
                  <motion.span
                    key={`creative-${index}`}
                    variants={letterVariants}
                    className="inline-block origin-bottom"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </span>

            {/* Line 2: WEB DESIGN */}
            <span className="block overflow-hidden py-1">
              <span className="flex justify-center text-[#38BDF8]" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5), 0 0 20px rgba(56, 189, 248, 0.35)" }}>
                {Array.from("WEB DESIGN").map((char, index) => (
                  <motion.span
                    key={`webdesign-${index}`}
                    variants={letterVariants}
                    className="inline-block origin-bottom"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
            </span>
          </motion.h1>

          {/* Decorated Get Started themed button with wave theme & themed hover animation */}
          <button 
            id="get-started-btn"
            style={{
              backgroundImage: `linear-gradient(270deg, ${gradient.map(c => `${c}cc`).join(', ')})`,
              boxShadow: `0 0 25px ${gradient[0]}66, 0 0 25px ${gradient[1] || gradient[0]}44`
            }}
            className="cta-navbar-premium relative flex items-center gap-3 px-8 py-4 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest cursor-pointer transition-all duration-300"
          >
            <div className="absolute inset-0 wave-btn-inner-pulse" />
            <span className="relative z-10 font-bold tracking-widest">Get Started</span>
            <ArrowRight className="w-5 h-5 relative z-10 shrink-0" />
          </button>
        </div>

      </main>

      {/* 4. MODULAR CONTROL PANEL SIDE-DRAWER / MODAL (SETTINGS TAB OVERLAY WITH SUPER TRANSPARENT LIQUID GLASS DESIGN) */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            id="settings-panel"
            initial={{ x: "110%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "110%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 200 }}
            className="fixed top-28 right-4 sm:right-8 h-[calc(100vh-140px)] w-[calc(100vw-32px)] sm:w-96 md:w-[480px] liquid-glass-panel z-50 flex flex-col justify-between overflow-hidden text-left rounded-3xl"
          >
            {/* Premium Header - sub-navigation options and close button cleanly separated on one line */}
            <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-white/5 bg-black/20 gap-4">
              <div className="flex gap-1.5 bg-white/5 p-1 rounded-xl border border-white/5">
                <button
                  onClick={() => setActiveTab("presets")}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${activeTab === "presets" ? "liquid-glass-btn-active text-white" : "text-white/50 hover:text-white"}`}
                >
                  Presets
                </button>
                <button
                  onClick={() => setActiveTab("sliders")}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${activeTab === "sliders" ? "liquid-glass-btn-active text-white" : "text-white/50 hover:text-white"}`}
                >
                  Waves
                </button>
                <button
                  onClick={() => setActiveTab("physics")}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${activeTab === "physics" ? "liquid-glass-btn-active text-white" : "text-white/50 hover:text-white"}`}
                >
                  Physics
                </button>
              </div>

              <button 
                onClick={() => setShowSettings(false)}
                className="p-2 text-white/50 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-full transition-all duration-300 cursor-pointer shrink-0"
                title="Close Customizer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content Pane */}
            <div className="flex-grow p-6 md:p-8 overflow-y-auto space-y-8 custom-scrollbar">
              
              {/* TAB 1: PRESETS */}
              {activeTab === "presets" && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-white/40 uppercase tracking-widest block">Core Colorways & Speeds</span>
                    <h3 className="text-sm font-bold uppercase text-white">Select Designed Master Palette</h3>
                    <p className="text-xs text-white/60">Instantly update all waves to custom interactive matrices curated by Flux Labs.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {PRESETS.map((p, idx) => {
                      const isActive = gradient.join(",") === p.gradient.join(",");
                      return (
                        <button
                          key={idx}
                          onClick={() => handleLoadPreset(p)}
                          className={`w-full p-4 rounded-xl text-left flex justify-between items-center cursor-pointer transition-all ${isActive ? "liquid-glass-btn-active border-white" : "liquid-glass-btn"}`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex -space-x-2">
                              {p.gradient.slice(0, 4).map((color, cIdx) => (
                                <div 
                                  key={cIdx} 
                                  className="w-5 h-5 rounded-full border border-[#030303] shadow-sm shrink-0" 
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                            <div>
                              <span className="font-bold text-xs uppercase text-white block">{p.name}</span>
                              <span className="text-[10px] font-mono text-white/40">SPEED: {p.animationSpeed}x // BEND: {p.bendStrength}</span>
                            </div>
                          </div>
                          <div className={`w-2.5 h-2.5 rounded-full ${isActive ? "bg-white animate-ping" : "bg-transparent border border-white/20"}`} />
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <button 
                      onClick={handleRandomize}
                      className="w-full py-3.5 text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 cursor-pointer rounded-xl liquid-glass-btn"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Algorithmic Scrambler
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: MANUAL WAVE SLIDERS */}
              {activeTab === "sliders" && (
                <div className="space-y-6">
                  
                  {/* Animation Speed Slider */}
                  <div className="space-y-2 border-b border-white/10 pb-6">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="uppercase text-white/50 tracking-widest">Kinetic Velocity</span>
                      <span className="text-white font-bold">{animationSpeed}x</span>
                    </div>
                    <input 
                      type="range"
                      min="0.1"
                      max="3.0"
                      step="0.05"
                      value={animationSpeed}
                      onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                      className="w-full accent-white bg-white/10 h-1 rounded-lg cursor-pointer"
                    />
                    <p className="text-[10px] text-white/40">Adjusts the overall frequency and movement speed of all line segments.</p>
                  </div>

                  {/* Active Wave Toggles */}
                  <div className="space-y-3 pb-4 border-b border-white/10">
                    <span className="text-xs font-mono uppercase text-white/50 tracking-widest block">Active Wave Fields</span>
                    <div className="flex gap-2">
                      {(["top", "middle", "bottom"] as Array<"top" | "middle" | "bottom">).map((wave) => {
                        const isEnabled = enabledWaves.includes(wave);
                        return (
                          <button
                            key={wave}
                            onClick={() => {
                              if (isEnabled) {
                                setEnabledWaves(enabledWaves.filter(w => w !== wave));
                              } else {
                                setEnabledWaves([...enabledWaves, wave]);
                              }
                            }}
                            className={`flex-1 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer ${isEnabled ? "liquid-glass-btn-active" : "liquid-glass-btn"}`}
                          >
                            {wave} wave
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Line Counts & Distances */}
                  <div className="space-y-6">
                    <span className="text-xs font-mono uppercase text-white/50 tracking-widest block">Wave Grid Density Specs</span>

                    {/* TOP WAVE */}
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-4 backdrop-blur-md">
                      <span className="text-[10px] font-mono font-bold uppercase text-white tracking-widest block">1. Top Layer Wave</span>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-white/40 uppercase block">Line Count: {lineCounts[0]}</label>
                          <input 
                            type="range"
                            min="1"
                            max="20"
                            value={lineCounts[0]}
                            onChange={(e) => {
                              const updated = [...lineCounts];
                              updated[0] = parseInt(e.target.value);
                              setLineCounts(updated);
                            }}
                            className="w-full accent-white bg-white/10 h-1 rounded"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-white/40 uppercase block">Line Pitch: {lineDistances[0]}</label>
                          <input 
                            type="range"
                            min="1"
                            max="15"
                            value={lineDistances[0]}
                            onChange={(e) => {
                              const updated = [...lineDistances];
                              updated[0] = parseInt(e.target.value);
                              setLineDistances(updated);
                            }}
                            className="w-full accent-white bg-white/10 h-1 rounded"
                          />
                        </div>
                      </div>
                    </div>

                    {/* MIDDLE WAVE */}
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-4 backdrop-blur-md">
                      <span className="text-[10px] font-mono font-bold uppercase text-white tracking-widest block">2. Middle Layer Wave</span>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-white/40 uppercase block">Line Count: {lineCounts[1]}</label>
                          <input 
                            type="range"
                            min="1"
                            max="20"
                            value={lineCounts[1]}
                            onChange={(e) => {
                              const updated = [...lineCounts];
                              updated[1] = parseInt(e.target.value);
                              setLineCounts(updated);
                            }}
                            className="w-full accent-white bg-white/10 h-1 rounded"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-white/40 uppercase block">Line Pitch: {lineDistances[1]}</label>
                          <input 
                            type="range"
                            min="1"
                            max="15"
                            value={lineDistances[1]}
                            onChange={(e) => {
                              const updated = [...lineDistances];
                              updated[1] = parseInt(e.target.value);
                              setLineDistances(updated);
                            }}
                            className="w-full accent-white bg-white/10 h-1 rounded"
                          />
                        </div>
                      </div>
                    </div>

                    {/* BOTTOM WAVE */}
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-4 backdrop-blur-md">
                      <span className="text-[10px] font-mono font-bold uppercase text-white tracking-widest block">3. Bottom Layer Wave</span>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-white/40 uppercase block">Line Count: {lineCounts[2]}</label>
                          <input 
                            type="range"
                            min="1"
                            max="20"
                            value={lineCounts[2]}
                            onChange={(e) => {
                              const updated = [...lineCounts];
                              updated[2] = parseInt(e.target.value);
                              setLineCounts(updated);
                            }}
                            className="w-full accent-white bg-white/10 h-1 rounded"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-white/40 uppercase block">Line Pitch: {lineDistances[2]}</label>
                          <input 
                            type="range"
                            min="1"
                            max="15"
                            value={lineDistances[2]}
                            onChange={(e) => {
                              const updated = [...lineDistances];
                              updated[2] = parseInt(e.target.value);
                              setLineDistances(updated);
                            }}
                            className="w-full accent-white bg-white/10 h-1 rounded"
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 3: GRAVITY & INTERACTION */}
              {activeTab === "physics" && (
                <div className="space-y-6">
                  
                  {/* Mouse Interactivity Switch */}
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2 backdrop-blur-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs font-bold uppercase text-white block">Mouse Vector Distortion</span>
                        <span className="text-[10px] font-mono text-white/40">Enable cursor kinetic displacement</span>
                      </div>
                      <input 
                        type="checkbox"
                        checked={interactive}
                        onChange={(e) => setInteractive(e.target.checked)}
                        className="w-4 h-4 accent-white cursor-pointer"
                      />
                    </div>
                  </div>

                  {interactive && (
                    <>
                      {/* Bend Strength */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="uppercase text-white/50 tracking-widest">Gravity Strength</span>
                          <span className="text-white font-bold">{bendStrength}</span>
                        </div>
                        <input 
                          type="range"
                          min="-3.0"
                          max="3.0"
                          step="0.1"
                          value={bendStrength}
                          onChange={(e) => setBendStrength(parseFloat(e.target.value))}
                          className="w-full accent-white bg-white/10 h-1 rounded-lg cursor-pointer"
                        />
                        <p className="text-[10px] text-white/40">Positive values push wave segments away from cursor. Negative values pull waves towards it.</p>
                      </div>

                      {/* Bend Radius */}
                      <div className="space-y-2 border-b border-white/10 pb-6">
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="uppercase text-white/50 tracking-widest">Influence Radius</span>
                          <span className="text-white font-bold">{bendRadius}</span>
                        </div>
                        <input 
                          type="range"
                          min="1.0"
                          max="20.0"
                          step="0.5"
                          value={bendRadius}
                          onChange={(e) => setBendRadius(parseFloat(e.target.value))}
                          className="w-full accent-white bg-white/10 h-1 rounded-lg cursor-pointer"
                        />
                        <p className="text-[10px] text-white/40">Controls how far the gravity field extends from your mouse coordinate.</p>
                      </div>
                    </>
                  )}

                  {/* Motion Parallax Switch */}
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-4 backdrop-blur-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs font-bold uppercase text-white block">Motion Parallax Shifts</span>
                        <span className="text-[10px] font-mono text-white/40">Layers float according to scroll & viewport hover</span>
                      </div>
                      <input 
                        type="checkbox"
                        checked={parallax}
                        onChange={(e) => setParallax(e.target.checked)}
                        className="w-4 h-4 accent-white cursor-pointer"
                      />
                    </div>

                    {parallax && (
                      <div className="space-y-2 pt-2 border-t border-white/10">
                        <div className="flex justify-between items-center text-[10px] font-mono">
                          <span className="uppercase text-white/40">Parallax Multiplier</span>
                          <span className="text-white">{parallaxStrength}</span>
                        </div>
                        <input 
                          type="range"
                          min="0.1"
                          max="1.5"
                          step="0.05"
                          value={parallaxStrength}
                          onChange={(e) => setParallaxStrength(parseFloat(e.target.value))}
                          className="w-full accent-white bg-white/10 h-1 rounded cursor-pointer"
                        />
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>

            {/* Panel footer summary - transparent */}
            <div className="p-4 border-t border-white/10 bg-black/30 backdrop-blur-sm flex justify-between items-center text-[10px] font-mono text-white/40">
              <span>FREQUENCY: {(42.8 * animationSpeed).toFixed(1)}Hz</span>
              <span>VECTOR STRENGTH: {(0.024 * (Math.abs(bendStrength) + 0.1)).toFixed(3)}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
