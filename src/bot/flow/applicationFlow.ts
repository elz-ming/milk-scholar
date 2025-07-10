import { collection, addDoc } from "firebase/firestore";
import { Buffer } from "buffer";

import { AppContext } from "../session";
import { db } from "@/app/lib/firebase";
import { Bucket_A_questions } from "@/app/data/questionBank";

export async function handleApplicationFlow(ctx: AppContext) {
  try {
    // ✅ Ensure the incoming message is text
    if (!("text" in ctx.message!)) {
      await ctx.reply("❌ Please reply with text only.");
      return;
    }

    const input = ctx.message?.text;
    const session = ctx.session;

    // ✅ Initialize the session state if starting fresh
    if (session.step === undefined) {
      session.step = 0;
      session.answers = {};
    }

    const currentStep = session.step;
    const currentQuestion = Bucket_A_questions[currentStep];

    // ✅ Defensive: if we somehow have no more questions but user still sends input
    if (!currentQuestion) {
      await ctx.reply("✅ You have already completed the application.");
      return;
    }

    // ✅ Store the user's answer under the correct dynamic key
    session.answers![currentQuestion.key] = input;

    // ✅ Prepare next question
    const nextStep = currentStep + 1;
    const nextQuestion = Bucket_A_questions[nextStep];

    if (nextQuestion) {
      // ✅ There is another question — update session and ask it
      session.step = nextStep;

      // ✅ If next question has options, show buttons too
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
      // ✅ All done — save to Firestore
      const userId = ctx.from?.id?.toString() ?? "";
      const encodedUserId = Buffer.from(userId).toString("base64");

      await addDoc(collection(db, "milk-scholar-applications"), {
        telegramUserId: ctx.from?.id,
        telegramUsername: ctx.from?.username,
        ...session.answers,
        createdAt: new Date().toISOString(),
      });

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

      // ✅ Reset session so user can reapply if needed
      session.step = undefined;
      return;
    }
  } catch (error) {
    console.error("🚨 Telegram bot error:", error);

    await ctx.reply(
      "⚠️ Sorry! Something went wrong while processing your application. Please try again later or contact support."
    );

    // Optionally, you might want to reset session to prevent stuck state
    ctx.session.step = undefined;
  }
}
