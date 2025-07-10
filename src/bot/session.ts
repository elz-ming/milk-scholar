import { Context, session } from "telegraf";

export interface AppAnswers {
  [key: string]: string | undefined; // ✅ index signature
}

export interface AppSession {
  step?: number;
  answers?: AppAnswers;
}

export interface AppContext extends Context {
  session: AppSession;
}

export const sessionMiddleware = session({
  defaultSession: (): AppSession => ({
    step: undefined,
    answers: {},
  }),
});
