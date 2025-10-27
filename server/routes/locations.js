import express from "express";
import { supabase } from "../supabaseClient.js";
const router = express.Router();

// Get all groups with coordinates
router.get("/locations", async (req, res) => {
  const { data, error } = await supabase.from("groups").select("*");
  if (error) return res.status(400).json({ error });
  res.json(data);
});

// Create a new group (optional secure route)
router.post("/locations", async (req, res) => {
  const { name, description, latitude, longitude, created_by } = req.body;
  const { error } = await supabase.from("groups").insert([
    { name, description, latitude, longitude, created_by },
  ]);
  if (error) return res.status(400).json({ error });
  res.status(201).json({ success: true });
});

export default router;
