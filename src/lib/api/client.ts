'use client';
import 'client-only';

import type { router } from '@/server/api';
import { createTRPCReact } from '@trpc/react-query';

const api = createTRPCReact<typeof router>();

export { api };
