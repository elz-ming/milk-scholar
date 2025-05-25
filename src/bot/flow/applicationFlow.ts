import { AppContext } from "../session";

export async function handleApplicationFlow(ctx: AppContext) {
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
      return ctx.reply(
        "✅ Thank you! Here's what we got:\n" +
          `Name: ${session.answers?.name}\n` +
          `Age: ${session.answers?.age}\n` +
          `Education: ${session.answers?.education}\n` +
          `Institution: ${session.answers?.institution}\n` +
          `LinkedIn: ${session.answers?.linkedin}`
      );
  }
}
