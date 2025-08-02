'use client';
import 'client-only';

import { createTRPCReact } from '@trpc/react-query';
import type { router } from '@/server/api';

const api = createTRPCReact<typeof router>();

export { api };
