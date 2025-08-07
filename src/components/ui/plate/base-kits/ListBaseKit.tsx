import { BaseListPlugin } from '@platejs/list';
import { KEYS } from 'platejs';
import { BlockListStatic } from '@/components/ui/plate/BlockListStatic';
import { BaseIndentKit } from '@/components/ui/plate/base-kits/IndentBaseKit';

export const BaseListKit = [
  ...BaseIndentKit,
  BaseListPlugin.configure({
    inject: {
      targetPlugins: [
        ...KEYS.heading,
        KEYS.p,
        KEYS.blockquote,
        KEYS.codeBlock,
        KEYS.toggle,
      ],
    },
    render: {
      belowNodes: BlockListStatic,
    },
  }),
];
