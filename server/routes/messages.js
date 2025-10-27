import express from "express";
import { supabase } from "../supabaseClient.js";
import { sendPushNotification } from "../utils/sendPushNotification.js";


const router = express.Router();

// Get all chats for a user
router.get("/chats", async (req, res) => {
  const userId = req.headers["x-user-id"];
  const { data, error } = await supabase
    .from("chat_participants")
    .select("chat_id, chats(name, is_group, created_at)")
    .eq("user_id", userId);


  // ✅ Reusable push helper
  await sendPushNotification({
    userId,
    title: "New Message",
    body: content,
    data: { chatId },
  });

  if (error) return res.status(400).json({ error });
  res.json(data);
});

// Get messages in a chat
router.get("/chats/:chatId/messages", async (req, res) => {
  const { chatId } = req.params;
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true });
  if (error) return res.status(400).json({ error });
  res.json(data);
});

// Send a message
router.post("/chats/:chatId/messages", async (req, res) => {
  const { chatId } = req.params;
  const { sender_id, content } = req.body;

  const { data, error } = await supabase
    .from("messages")
    .insert([{ chat_id: chatId, sender_id, content }])
    .select();

  if (error) return res.status(400).json({ error });
  res.json(data[0]);
});

export default router;
