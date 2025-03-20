import {
  authRouter,
  settingsRouter,
  shiftScheduleRouter,
  testRouter,
  utilsRouter,
} from '@/server/api/routers';
import { createCallerFactory, createRouter } from '@/server/api/trpc';

const router = createRouter({
  test: testRouter,
  auth: authRouter,
  shiftSchedule: shiftScheduleRouter,
  settings: settingsRouter,
  utils: utilsRouter,
});

const createCaller = createCallerFactory(router);

export { router, createCaller };
