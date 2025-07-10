import { Buffer } from "buffer";
import { doc, setDoc } from "firebase/firestore";

import { AppContext } from "../session";
import { db } from "@/app/lib/firebase";
import { Bucket_A_questions } from "@/app/data/questionBank";

export async function handleApplicationFlow(ctx: AppContext) {
  try {
    if (!("text" in ctx.message!)) {
      await ctx.reply("❌ Please reply with text only.");
      return;
    }

    const input = ctx.message?.text;
    const session = ctx.session;

    if (session.step === undefined) {
      session.step = 0;
      session.answers = {};
    }

    const currentStep = session.step;
    const currentQuestion = Bucket_A_questions[currentStep];

    if (!currentQuestion) {
      await ctx.reply("✅ You have already completed the application.");
      return;
    }

    session.answers![currentQuestion.key] = input;

    const nextStep = currentStep + 1;
    const nextQuestion = Bucket_A_questions[nextStep];

    if (nextQuestion) {
      session.step = nextStep;

      if (nextQuestion.options && nextQuestion.options.length > 0) {
        return ctx.reply(`${nextStep + 1}. ${nextQuestion.text}`, {
          reply_markup: {
            keyboard: nextQuestion.options.map((option) => [option]),
            resize_keyboard: true,
            one_time_keyboard: true,
          },
        });
      } else {
        return ctx.reply(`${nextStep + 1}. ${nextQuestion.text}`);
      }
    } else {
      const userId = ctx.from?.id?.toString() ?? "";
      const encodedUserId = Buffer.from(userId).toString("base64");

      const firstName = session.answers!["first_name"] || "";
      const lastName = session.answers!["last_name"] || "";
      const fullName = `${firstName} ${lastName}`.trim();

      // ✅ Use Telegram ID as doc ID for easy reference
      await setDoc(
        doc(db, "milk-scholar-applications", userId),
        {
          name: fullName,
          telegramUserId: ctx.from?.id,
          telegramUsername: ctx.from?.username,
          bucketAResponse: session.answers,
          createdAt: new Date().toISOString(),
        },
        { merge: true }
      );

      await ctx.reply(
        `✅ Thank you! Your application has been submitted.\n\nHere’s what we received:\n` +
          Object.entries(session.answers!)
            .map(([key, value]) => `• ${key}: ${value}`)
            .join("\n") +
          `\n\n🚀 Ready to continue? Tap below to open the WebApp.`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Open WebApp",
                  web_app: {
                    url: `${process.env.WEBAPP_URL}?startapp=${encodedUserId}`,
                  },
                },
              ],
            ],
          },
        }
      );

      session.step = undefined;
      return;
    }
  } catch (error) {
    console.error("🚨 Telegram bot error:", error);

    await ctx.reply(
      "⚠️ Sorry! Something went wrong while processing your application. Please try again later or contact support."
    );

    ctx.session.step = undefined;
  }
}
