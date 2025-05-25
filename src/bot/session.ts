import { Context, session } from "telegraf";

export interface AppAnswers {
  name?: string;
  age?: string;
  education?: string;
  institution?: string;
  linkedin?: string;
}

export interface AppSession {
  step?: number;
  answers?: AppAnswers;
}

// You don't need SessionFlavor for Telegraf v4
export interface AppContext extends Context {
  session: AppSession;
}

export const sessionMiddleware = session({
  defaultSession: (): AppSession => ({
    step: undefined,
    answers: {},
  }),
});
