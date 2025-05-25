import { Telegraf } from "telegraf";
import { sessionMiddleware, AppContext } from "./session";
import { handleApplicationFlow } from "./flow/applicationFlow";

export const bot = new Telegraf<AppContext>(process.env.BOT_TOKEN!);

// Middleware
bot.use(sessionMiddleware);

// Commands
bot.command("start", (ctx) => {
  ctx.reply("Welcome to MILK Scholar Bot! 🚀", {
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
  });
});

bot.action("start_application", async (ctx) => {
  ctx.session.step = 1;
  ctx.session.answers = {};
  await ctx.reply("1. What's your name?");
});

bot.on("text", handleApplicationFlow);

bot.command("webapp", (ctx) => {
  const userId = ctx.from?.id?.toString() ?? "";
  const encodedUserId = Buffer.from(userId.toString()).toString("base64");

  ctx.reply("🔓 Open Web App", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Open App",
            url: `${process.env.WEBAPP_URL}?startapp=${encodedUserId}`,
          },
        ],
      ],
    },
  });
});
