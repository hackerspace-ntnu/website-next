'use client';

import { TogglePlugin } from '@platejs/toggle/react';
import { IndentKit } from '@/components/ui/plate/kits/IndentKit';
import { ToggleElement } from '@/components/ui/plate/ToggleNode';

const ToggleKit = [...IndentKit, TogglePlugin.withComponent(ToggleElement)];

export { ToggleKit };
