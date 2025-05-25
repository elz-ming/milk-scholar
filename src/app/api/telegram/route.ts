import { Telegraf } from "telegraf";
import { NextRequest } from "next/server";

const bot = new Telegraf(process.env.BOT_TOKEN!);

// Commands
bot.command("start", (ctx) => {
  ctx.reply(
    "Welcome to MILK Scholar Bot! 🚀\nUse /help to see available commands.",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Start a new application.",
              callback_data: "start_application",
            },
          ],
        ],
      },
    }
  );
});

// Respond to any plain text message
// bot.command("start_application", (ctx) => {});

// Handle Telegram POST updates
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("🔥 Telegram update received:", JSON.stringify(body, null, 2));
    await bot.handleUpdate(body);
    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Telegram bot error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// Optional GET for Vercel check
export function GET() {
  return new Response("🤖 Telegram webhook is live.");
}
