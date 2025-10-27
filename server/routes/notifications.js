// routes/notifications.js
import express from "express";
import { supabase } from "../supabaseClient.js";
const router = express.Router();

// Save or update the push token for a user
router.post("/register-push-token", async (req, res) => {
  const { userId, token } = req.body;

  if (!userId || !token)
    return res.status(400).json({ error: "Missing userId or token" });

  const { error } = await supabase
    .from("user_push_tokens")
    .upsert({ user_id: userId, expo_push_token: token });

  if (error) return res.status(400).json({ error });

  res.json({ success: true });
});

export default router;
