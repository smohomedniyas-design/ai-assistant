import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.static('public'));

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      // PASTE YOUR STUDIO SYSTEM INSTRUCTIONS HERE:
      systemInstruction: "You are a helpful AI assistant built by Niyas.", 
    });

    const result = await model.generateContent(message);
    res.json({ reply: result.response.text() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI failed to respond" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running` ));