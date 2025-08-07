import { BaseMentionPlugin } from '@platejs/mention';

import { MentionElementStatic } from '@/components/ui/plate/mention-node-static';

export const BaseMentionKit = [
  BaseMentionPlugin.withComponent(MentionElementStatic),
];
