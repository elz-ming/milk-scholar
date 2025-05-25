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

export interface AppContext extends Context {
  session: AppSession;
}

export const sessionMiddleware = session<AppSession>({
  defaultSession: () => ({ step: undefined, answers: {} }),
});
