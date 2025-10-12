import { BaseAlignKit } from '@/components/ui/plate/base-kits/AlignBaseKit';
import { BaseBasicBlocksKit } from '@/components/ui/plate/base-kits/BasicBlocksBaseKit';
import { BaseBasicMarksKit } from '@/components/ui/plate/base-kits/BasicMarksBaseKit';
import { BaseCalloutKit } from '@/components/ui/plate/base-kits/CalloutBaseKit';
import { BaseCodeBlockKit } from '@/components/ui/plate/base-kits/CodeBlockBaseKit';
import { BaseColumnKit } from '@/components/ui/plate/base-kits/ColumnBaseKit';
import { BaseDateKit } from '@/components/ui/plate/base-kits/DateBaseKit';
import { BaseFontKit } from '@/components/ui/plate/base-kits/FontBaseKit';
import { BaseLineHeightKit } from '@/components/ui/plate/base-kits/LineHeightBaseKit';
import { BaseLinkKit } from '@/components/ui/plate/base-kits/LinkBaseKit';
import { BaseListKit } from '@/components/ui/plate/base-kits/ListBaseKit';
import { BaseMathKit } from '@/components/ui/plate/base-kits/MathBaseKit';
import { BaseMediaKit } from '@/components/ui/plate/base-kits/MediaBaseKit';
import { BaseMentionKit } from '@/components/ui/plate/base-kits/MentionBaseKit';
import { BaseTableKit } from '@/components/ui/plate/base-kits/TableBaseKit';
import { BaseTocKit } from '@/components/ui/plate/base-kits/TocBaseKit';
import { BaseToggleKit } from '@/components/ui/plate/base-kits/ToggleBaseKit';
import { MarkdownKit } from '@/components/ui/plate/kits/MarkdownKit';

const BaseEditorKit = [
  ...BaseBasicBlocksKit,
  ...BaseCodeBlockKit,
  ...BaseTableKit,
  ...BaseToggleKit,
  ...BaseTocKit,
  ...BaseMediaKit,
  ...BaseCalloutKit,
  ...BaseColumnKit,
  ...BaseMathKit,
  ...BaseDateKit,
  ...BaseLinkKit,
  ...BaseMentionKit,
  ...BaseBasicMarksKit,
  ...BaseFontKit,
  ...BaseListKit,
  ...BaseAlignKit,
  ...BaseLineHeightKit,
  ...MarkdownKit,
];

export { BaseEditorKit };
