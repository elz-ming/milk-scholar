import { AppContext } from "../session";
import { db } from "@/app/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Buffer } from "buffer";

export async function handleApplicationFlow(ctx: AppContext) {
  if (!("text" in ctx.message!)) {
    await ctx.reply("❌ Please reply with text only.");
    return;
  }

  const input = ctx.message?.text;
  const session = ctx.session;

  switch (session.step) {
    case 1:
      session.answers!.name = input;
      session.step = 2;
      return ctx.reply("2. What's your age?");
    case 2:
      session.answers!.age = input;
      session.step = 3;
      return ctx.reply("3. What's your higher education status?");
    case 3:
      session.answers!.education = input;
      session.step = 4;
      return ctx.reply("4. Which institution are you attending?");
    case 4:
      session.answers!.institution = input;
      session.step = 5;
      return ctx.reply("5. What's your LinkedIn URL?");
    case 5:
      session.answers!.linkedin = input;
      session.step = undefined;

      // Use user ID (private chat)
      const userId = ctx.from?.id?.toString() ?? "";
      const encodedUserId = Buffer.from(userId).toString("base64");

      // Save to Firestore
      await addDoc(collection(db, "milk-scholar-applications"), {
        telegramUserId: ctx.from?.id,
        telegramUsername: ctx.from?.username,
        ...session.answers,
        createdAt: new Date().toISOString(),
      });

      await ctx.reply(
        "✅ Thank you! Your application has been submitted.\n\nHere's what we received:\n" +
          `Name: ${session.answers?.name}\n` +
          `Age: ${session.answers?.age}\n` +
          `Education: ${session.answers?.education}\n` +
          `Institution: ${session.answers?.institution}\n` +
          `LinkedIn: ${session.answers?.linkedin}`
      );

      await ctx.reply("🚀 Ready to continue? Open the WebApp below:", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Open WebApp",
                url: `https://${process.env.WEBAPP_URL}?startapp=${encodedUserId}`,
              },
            ],
          ],
        },
      });

      return;
  }
}
