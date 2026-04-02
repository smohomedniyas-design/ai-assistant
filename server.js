import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// This tells the server to use the files from your new Sands dist folder
app.use(express.static(path.join(__dirname, "dist")));

// This ensures that if you refresh the page, it stays on your app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Sands Strategy Assistant is live on port ${PORT}`));