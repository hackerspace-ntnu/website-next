'use client';

import { TogglePlugin } from '@platejs/toggle/react';
import { ToggleElement } from '@/components/ui/plate/ToggleNode';
import { IndentKit } from './IndentKit';

export const ToggleKit = [
  ...IndentKit,
  TogglePlugin.withComponent(ToggleElement),
];
