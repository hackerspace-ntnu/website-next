import { BaseTogglePlugin } from '@platejs/toggle';

import { ToggleElementStatic } from '@/components/ui/plate/toggle-node-static';

export const BaseToggleKit = [
  BaseTogglePlugin.withComponent(ToggleElementStatic),
];
