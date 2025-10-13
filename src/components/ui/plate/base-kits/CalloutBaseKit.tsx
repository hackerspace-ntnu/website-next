import { BaseCalloutPlugin } from '@platejs/callout';

import { CalloutElementStatic } from '@/components/ui/plate/CalloutNodeStatic';

const BaseCalloutKit = [BaseCalloutPlugin.withComponent(CalloutElementStatic)];

export { BaseCalloutKit };
