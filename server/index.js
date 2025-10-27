import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import messagesRouter from "./routes/messages.js";
import locationsRouter from "./routes/locations.js"

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect to Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Simple test endpoint
app.get("/", (req, res) => {
  res.send("✅ Flockmap API is running!");
});

// Message routes
app.use("/api", messagesRouter);

// Location routes
app.use("/api", locationsRouter);

// verify Supabase JWT coming from Expo app
app.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) return res.status(401).json({ error: "Invalid token" });
  res.json({ user });
});


// Example: get all users (from your profiles table)
app.get("/profiles", async (req, res) => {
  const { data, error } = await supabase.from("profiles").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
