import { BaseMentionPlugin } from '@platejs/mention';

import { MentionElementStatic } from '@/components/ui/plate/MentionNodeStatic';

export const BaseMentionKit = [
  BaseMentionPlugin.withComponent(MentionElementStatic),
];
