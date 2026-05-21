import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization of Gemini client to prevent crash if key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "MY_GEMINI_API_KEY") {
    console.warn("WARNING: GEMINI_API_KEY is not configured or left as default. Dynamic AI dish creation will run in premium simulation mode.");
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Global matches in memory for session
const savedMatches: any[] = [];

// API: Check AI Service Availability
app.get("/api/gemini/status", (req, res) => {
  const client = getGeminiClient();
  res.json({ enabled: client !== null });
});

// API: Generate unique dynamic meal matching user preferences (using Type.OBJECT schema)
app.post("/api/gemini/suggest", async (req, res) => {
  const { mood, ingredients: userIngredients, extraRequest } = req.body;
  const client = getGeminiClient();

  if (!client) {
    // Elegant fallback simulation representing fine crafted local recipes when API is unavailable
    const mockMeals = [
      {
        name: "Glazed Truffle Teriyaki Burger",
        tags: ["DENSE SOY", "CARAMELIZED", "FUSION"],
        description: "A gorgeous luxury hand-pressed beef patty glazed with artisanal sweet teriyaki sauce, loaded with wild sake-sautéed forest mushrooms, and thick truffle cheddar cheese on a dark sesame milk bun.",
        time: "22 min",
        ingredients: ["Hand-pressed Beef Patty", "Sweet Teriyaki Sauce", "Artisanal Truffle Cheddar", "Sake-sautéed Mushrooms", "Sesame Milk Bun"],
        spiceLevel: 25,
        savoryLevel: 95,
        sweetLevel: 65,
        umamiLevel: 95
      },
      {
        name: "Spicy Volcano Avocado Poke",
        tags: ["SPICY HEAT", "CREAMY", "SUPERFOOD"],
        description: "A beautiful, premium wild-caught salmon and yellowfin tuna poke bowl, topped with rich Hass avocado, pickled jalapenos, black sesame seeds, and our signature fiery organic green volcano sriracha.",
        time: "12 min",
        ingredients: ["Wild-caught Salmon", "Yellowfin Tuna", "Fresh Avocado", "Pickled Jalapenos", "Organic Green Sriracha", "Sesame Seeds"],
        spiceLevel: 85,
        savoryLevel: 40,
        sweetLevel: 20,
        umamiLevel: 80
      },
      {
        name: "Saffron Umami Tagliolini",
        tags: ["CITRUS GUSTO", "UMAMI", "GOLDEN"],
        description: "Delicate strands of golden hand-rolled saffron tagliolini tossed in a creamy, velvety Meyer lemon butter sauce, embellished with wild roasted porcini mushrooms and finished with grated white truffles.",
        time: "18 min",
        ingredients: ["Golden Tagliolini Noodles", "Velvety Lemon Butter Sauce", "Roasted Porcini Mushrooms", "Saffron Threads", "White Truffles"],
        spiceLevel: 10,
        savoryLevel: 75,
        sweetLevel: 30,
        umamiLevel: 90
      }
    ];

    // Pick dynamic option based on mood or search keyword
    let selectedMock = mockMeals[0];
    if (mood && mood.toLowerCase().includes("spicy") || (extraRequest && extraRequest.toLowerCase().includes("spicy"))) {
      selectedMock = mockMeals[1];
    } else if (mood && mood.toLowerCase().includes("healthy") || (extraRequest && extraRequest.toLowerCase().includes("fresh"))) {
      selectedMock = mockMeals[2];
    } else {
      selectedMock = mockMeals[Math.floor(Math.random() * mockMeals.length)];
    }

    return res.json({ meal: selectedMock, simulated: true });
  }

  try {
    const prompt = `Create an ultra-gorgeous culinary dish styled for a late-night, premium gourmet concierge app.
The user selected Mood/Vibe: "${mood || "Adventurous Cravings"}"
They specified ingredients to use: "${userIngredients || "Chef's Choice Selection"}"
Custom extra request: "${extraRequest || "Make it look spectacular"}"

The output name should be cinematic and dramatic. Ensure the statistics (levels: spiceLevel, savoryLevel, sweetLevel, umamiLevel) are on a 1-100 scale, reflecting the flavor profile accurately in an editorial style.`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an elite, Michelin-star executive chef and sensory food designer. Your language is highly descriptive, editorial, and evocative. You return a beautifully designed culinary concept in strict JSON format.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: {
              type: Type.STRING,
              description: "The premium display name of the dish (e.g. Sizzling Wagyu Flank with Charred Asparagus)"
            },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Highly evocative UPPERCASE tag pairs (e.g., ['BOLD', 'CHARRED', 'SWEET GLOW'])"
            },
            description: {
              type: Type.STRING,
              description: "A gorgeous, high-end 3-sentence editorial sensory description that highlights textures and aromatics."
            },
            time: {
              type: Type.STRING,
              description: "Preparation time, e.g. '18 min'"
            },
            ingredients: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Up to 6 high-end ingredients names"
            },
            spiceLevel: {
              type: Type.INTEGER,
              description: "Spice level indicator from 0 (none) to 100 (extreme fire)"
            },
            savoryLevel: {
              type: Type.INTEGER,
              description: "Savory/Richness level from 0 to 100"
            },
            sweetLevel: {
              type: Type.INTEGER,
              description: "Sweetness intensity from 0 to 100"
            },
            umamiLevel: {
              type: Type.INTEGER,
              description: "Umami/Depth level from 0 to 100"
            }
          },
          required: ["name", "tags", "description", "time", "ingredients", "spiceLevel", "savoryLevel", "sweetLevel", "umamiLevel"]
        }
      }
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("No response string from Gemini");
    }

    const generatedMeal = JSON.parse(textOutput.trim());
    return res.json({ meal: generatedMeal, simulated: false });
  } catch (error: any) {
    console.error("Gemini meal suggestion generator failed: ", error);
    return res.status(500).json({ error: "Sensory builder encountered a culinary block", details: error.message });
  }
});

// API: Generate witty battle commentator text for VS mode
app.post("/api/gemini/battle", async (req, res) => {
  const { topMeal, bottomMeal } = req.body;
  const client = getGeminiClient();

  if (!client) {
    return res.json({
      commentary: `The stage is set for a monumental battle of culinary titans. Gourmet meets broth, savory meets flame—can your cravings handle the choice? Choose your champion carefully!`,
      simulated: true
    });
  }

  try {
    const prompt = `Write a short, cinematic, high-energy 60-word match-up description comparing:
1: "${topMeal}"
2: "${bottomMeal}"
Bring out the fierce rivalry and contrast between these two sensory profiles (e.g. rich, savory beef burger versus bubbling, artisan spicy broth). Make it dramatic and punchy, targeting a luxury dining swiper. Do not write introductory or concluding meta-chatter, go straight to the action.`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an elegant, smooth-talking underground food tournament combat announcer. Your voice is dark, punchy, and cinematic.",
      }
    });

    return res.json({ commentary: response.text?.trim() || "The ultimate faceoff of textures and spices.", simulated: false });
  } catch (error: any) {
    console.error("Gemini battle commentator failed: ", error);
    return res.json({ commentary: `Decisions, decisions. In this corner, the heavy-hitting ${topMeal}. In the other, the seductive, steaming ${bottomMeal}. Each a masterpiece—who will reign supreme on your palate?` });
  }
});

// Serve UI / Static Build Setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[MealSwipe-Server] running at http://localhost:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
