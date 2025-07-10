import { Telegraf } from "telegraf";
import { Buffer } from "buffer";
import { collection, query, where, getDocs } from "firebase/firestore";

import { sessionMiddleware, AppContext } from "./session";
import { handleApplicationFlow } from "./flow/applicationFlow";
import { db } from "@/app/lib/firebase";
import { Bucket_A_questions } from "@/app/data/questionBank";

export const bot = new Telegraf<AppContext>(process.env.BOT_TOKEN!);

// Middleware
bot.use(sessionMiddleware);

// Commands
bot.command("start", async (ctx) => {
  const userId = ctx.from?.id?.toString() ?? "";

  // ✅ Check Firestore for existing application
  const appQuery = query(
    collection(db, "milk-scholar-applications"),
    where("telegramUserId", "==", parseInt(userId))
  );
  const snapshot = await getDocs(appQuery);

  if (snapshot.empty) {
    // ✅ No record → show "Start Application"
    await ctx.reply("Welcome to MILK Scholar Bot! 🚀", {
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
  } else {
    // ✅ Already exists → show "Open WebApp"
    const encodedUserId = Buffer.from(userId).toString("base64");
    const webAppUrl = `${process.env.WEBAPP_URL}?startapp=${encodedUserId}`;

    await ctx.reply(
      "✅ You already have an application on file.\n\nOpen your WebApp below to continue or update:",
      {
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
      }
    );
  }
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
  const userId = ctx.from?.id?.toString() ?? "";

  // ✅ Check Firestore before starting flow
  const appQuery = query(
    collection(db, "milk-scholar-applications"),
    where("telegramUserId", "==", parseInt(userId))
  );
  const snapshot = await getDocs(appQuery);

  if (!snapshot.empty) {
    // ✅ Already exists → skip questions
    const encodedUserId = Buffer.from(userId).toString("base64");
    const webAppUrl = `${process.env.WEBAPP_URL}?startapp=${encodedUserId}`;

    await ctx.reply(
      "✅ You already have an application on file. Open your WebApp below:",
      {
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
      }
    );
    return;
  }

  // ✅ No record → start onboarding flow
  ctx.session.step = 0;
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
