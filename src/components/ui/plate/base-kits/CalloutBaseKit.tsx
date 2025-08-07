import { BaseCalloutPlugin } from '@platejs/callout';

import { CalloutElementStatic } from '@/components/ui/plate/CalloutNodeStatic';

export const BaseCalloutKit = [
  BaseCalloutPlugin.withComponent(CalloutElementStatic),
];
