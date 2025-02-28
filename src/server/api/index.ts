import {
  authRouter,
  shiftScheduleRouter,
  testRouter,
} from '@/server/api/routers';
import { createCallerFactory, createRouter } from '@/server/api/trpc';

const router = createRouter({
  test: testRouter,
  auth: authRouter,
  shiftSchedule: shiftScheduleRouter,
});

const createCaller = createCallerFactory(router);

export { router, createCaller };
