'use client';
import 'client-only';

import type { router } from '@/server/api';
import { createTRPCReact } from '@trpc/react-query';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

const api = createTRPCReact<typeof router>();

type RouterInputs = inferRouterInputs<typeof router>;
type RouterOutputs = inferRouterOutputs<typeof router>;

export { api, type RouterInputs, type RouterOutputs };
