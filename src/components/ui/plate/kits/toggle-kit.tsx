'use client';

import { TogglePlugin } from '@platejs/toggle/react';
import { ToggleElement } from '@/components/ui/plate/toggle-node';
import { IndentKit } from './indent-kit';

export const ToggleKit = [
  ...IndentKit,
  TogglePlugin.withComponent(ToggleElement),
];
