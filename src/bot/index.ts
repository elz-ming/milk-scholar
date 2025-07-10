import { Telegraf } from "telegraf";
import { Buffer } from "buffer";

import { sessionMiddleware, AppContext } from "./session";
import { handleApplicationFlow } from "./flow/applicationFlow";
import { Bucket_A_questions } from "@/app/data/questionBank";

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

bot.command("help", (ctx) => {
  ctx.reply(
    "Available commands:\n" +
      "/start - Start the bot\n" +
      "/help - Show this help message\n" +
      "/webapp - Open the Mini App"
  );
});

bot.command("webapp", (ctx) => {
  const userId = ctx.from?.id?.toString() ?? "";
  const encodedUserId = Buffer.from(userId).toString("base64");
  const webAppUrl = `${process.env.WEBAPP_URL}?startapp=${encodedUserId}`;

  ctx.reply("🔓 Open Web App", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Open WebApp",
            web_app: {
              url: webAppUrl,
            },
          },
        ],
      ],
    },
  });
});

bot.action("start_application", async (ctx) => {
  ctx.session.step = 0; // ✅ correct: index 0
  ctx.session.answers = {};

  const firstQuestion = Bucket_A_questions[0];

  if (firstQuestion.options && firstQuestion.options.length > 0) {
    await ctx.reply(`1. ${firstQuestion.text}`, {
      reply_markup: {
        keyboard: firstQuestion.options.map((option) => [option]),
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
  } else {
    await ctx.reply(`1. ${firstQuestion.text}`);
  }
});

bot.on("text", handleApplicationFlow);
