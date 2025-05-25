import { NextRequest } from "next/server";
import { bot } from "@/bot/index";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("🔥 Telegram update received:", JSON.stringify(body, null, 2));
    await bot.handleUpdate(body); // ✅ no polling used
    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Telegram bot error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export function GET() {
  return new Response("🤖 Telegram webhook is live.");
}
