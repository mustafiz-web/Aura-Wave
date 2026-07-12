import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent and key
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("GEMINI_API_KEY is not defined. AI customization will not be available.");
}

// 1. API routes FIRST
app.post("/api/chat", async (req, res) => {
  if (!ai) {
    return res.status(500).json({
      error: "Gemini API is not configured. Please define GEMINI_API_KEY in your settings."
    });
  }

  const { message, history } = req.body;

  try {
    const systemInstruction = `
You are the creative AI director of "Aura Wave", a high-tech interactive shader platform.
You help the user customize their dynamic three.js floating wave line shader by generating responsive parameter updates.

You MUST respond with a JSON object containing exactly two fields:
1. "reply": A friendly, conversational message explaining what adjustments you are making, why you chose those options, and creative advice (written in clean markdown, brief and punchy!).
2. "params": An object containing any updated parameters that should change in the slider controls. Keep it null if no parameter updates are requested or needed.

Supported parameter values inside "params":
- "linesGradient": string[] (array of hex colors, e.g., ["#ff3366", "#9900ff", "#33ccff"], up to 8 colors maximum. Give beautiful, high-contrast palette blends that glow nicely on a dark canvas!)
- "animationSpeed": number (0.1 to 4.0)
- "enabledWaves": ("top" | "middle" | "bottom")[]
- "lineCount": number[] (exactly 3 numbers, each representing top, middle, bottom line counts respectively, e.g., [8, 12, 6], range 1 to 20)
- "lineDistance": number[] (exactly 3 numbers, e.g., [4, 8, 3], range 1 to 20)
- "interactive": boolean
- "bendRadius": number (1.0 to 20.0)
- "bendStrength": number (-3.0 to 3.0)
- "parallax": boolean
- "parallaxStrength": number (0.1 to 2.0)

Example themes you can create:
- "lava" or "volcano": {"reply": "I've loaded the 'Magma Flows' theme. Molten orange, crimson red, and deep volcanic charcoal meet at an accelerated kinetic speed.", "params": {"linesGradient": ["#110000", "#550000", "#ff3300", "#ffaa00", "#ffee77"], "animationSpeed": 1.8, "lineCount": [5, 12, 4], "lineDistance": [3, 8, 4]}}
- "forest" or "calm green": {"reply": "Adjusted to a tranquil moss-and-emerald palette with reduced kinetic velocity for a meditative ambience.", "params": {"linesGradient": ["#022c22", "#064e3b", "#059669", "#34d399", "#a7f3d0"], "animationSpeed": 0.4, "lineCount": [8, 10, 8]}}
- "neon cyberpunk": {"reply": "Booting up 'Neo Tokyo'. Hot cyan, magenta, and electric violet with strong cursor bend interactions.", "params": {"linesGradient": ["#ff007f", "#9d00ff", "#00ffff", "#000000"], "animationSpeed": 1.5, "bendStrength": -1.2, "lineCount": [8, 14, 6]}}
- "aurora borealis": {"reply": "Enabling the 'Northern Lights'. Pale greens, electric cyan, and deep indigo with soft speed and high bend influence.", "params": {"linesGradient": ["#021226", "#044040", "#098c76", "#14d99f", "#6fffe9"], "animationSpeed": 0.6, "lineCount": [12, 8, 10], "lineDistance": [6, 4, 7]}}

Ensure you ALWAYS reply with valid JSON matching this schema, even for simple questions. Return "params" as null if no changes are requested.
`;

    const chatSession = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: {
              type: Type.STRING,
              description: "The AI creative response or design guidance."
            },
            params: {
              type: Type.OBJECT,
              nullable: true,
              description: "Optional shader adjustments requested by user."
            }
          },
          required: ["reply"]
        }
      }
    });

    // Populate history
    if (history && history.length > 0) {
      // Not strictly necessary for simple requests, but excellent for continuity.
    }

    const response = await chatSession.sendMessage({
      message: message
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);

  } catch (error: any) {
    console.error("Gemini AI API Error:", error);
    res.status(500).json({
      reply: "Sorry, I encountered an issue adjusting the waves. Let me try again.",
      error: error.message
    });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", mode: process.env.NODE_ENV || "development" });
});

// 2. Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
