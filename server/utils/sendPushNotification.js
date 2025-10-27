import { Expo } from "expo-server-sdk";
import { supabase } from "../supabaseClient.js";

const expo = new Expo();

/**
 * Reusable push notification utility
 *
 * @param {Object} options
 * @param {string[]} options.userIds - Array of user IDs to notify
 * @param {string} options.title - Notification title
 * @param {string} options.body - Notification message
 * @param {Object} [options.data] - Optional data payload
 */
export async function sendPushNotification({
  userIds,
  title,
  body,
  data = {},
}) {
  if (!userIds?.length) {
    console.warn("sendPushNotification called without userIds");
    return;
  }

  try {
    // 1️⃣ Get tokens from Supabase
    const { data: tokensData, error } = await supabase
      .from("user_push_tokens")
      .select("expo_push_token")
      .in("user_id", userIds);

    if (error) {
      console.error("Error fetching push tokens:", error);
      return;
    }

    const tokens = tokensData.map((r) => r.expo_push_token).filter(Boolean);

    if (!tokens.length) {
      console.warn("No valid tokens found for these users:", userIds);
      return;
    }

    // 2️⃣ Build notification messages
    const messages = tokens.map((token) => ({
      to: token,
      sound: "default",
      title,
      body,
      data,
    }));

    // 3️⃣ Chunk + send
    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];

    for (const chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (err) {
        console.error("Error sending push notifications:", err);
      }
    }

    console.log("📨 Sent push notifications:", tickets.length);
    return tickets;
  } catch (error) {
    console.log("Error sending push not:", error);
  }
}

// HOW TO USE:
// ✅ Reusable push helper
// await sendPushNotification({
//   userIds,
//   title: "New Message",
//   body: content,
//   data: { chatId },
// });
