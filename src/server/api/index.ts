import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import {
  applicationsRouter,
  authRouter,
  bannersRouter,
  eventsRouter,
  forgotPasswordRouter,
  groupsRouter,
  newsRouter,
  officeRouter,
  quotesRouter,
  reservationsRouter,
  rulesRouter,
  settingsRouter,
  shiftScheduleRouter,
  skillsRouter,
  slidesRouter,
  storageRouter,
  testRouter,
  toolsRouter,
  usersRouter,
  utilsRouter,
} from '@/server/api/routers';
import { counterRouter } from '@/server/api/routers/counter';
import { createCallerFactory, createRouter } from '@/server/api/trpc';

const router = createRouter({
  applications: applicationsRouter,
  auth: authRouter,
  banners: bannersRouter,
  events: eventsRouter,
  forgotPassword: forgotPasswordRouter,
  groups: groupsRouter,
  slides: slidesRouter,
  news: newsRouter,
  office: officeRouter,
  quotes: quotesRouter,
  reservations: reservationsRouter,
  rules: rulesRouter,
  settings: settingsRouter,
  shiftSchedule: shiftScheduleRouter,
  skills: skillsRouter,
  storage: storageRouter,
  test: testRouter,
  tools: toolsRouter,
  users: usersRouter,
  utils: utilsRouter,
  counter: counterRouter,
});

const createCaller = createCallerFactory(router);

type RouterInput = inferRouterInputs<typeof router>;
type RouterOutput = inferRouterOutputs<typeof router>;

export { router, createCaller, type RouterInput, type RouterOutput };
