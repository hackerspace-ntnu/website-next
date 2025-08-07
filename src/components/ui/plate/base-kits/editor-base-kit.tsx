import { BaseDateKit } from '../kits/date-base-kit';
import { MarkdownKit } from '../kits/markdown-kit';
import { BaseTableKit } from '../kits/table-base-kit';
import { BaseAlignKit } from './align-base-kit';
import { BaseBasicBlocksKit } from './basic-blocks-base-kit';
import { BaseBasicMarksKit } from './basic-marks-base-kit';
import { BaseCalloutKit } from './callout-base-kit';
import { BaseCodeBlockKit } from './code-block-base-kit';
import { BaseColumnKit } from './column-base-kit';
import { BaseFontKit } from './font-base-kit';
import { BaseLineHeightKit } from './line-height-base-kit';
import { BaseLinkKit } from './link-base-kit';
import { BaseListKit } from './list-base-kit';
import { BaseMathKit } from './math-base-kit';
import { BaseMediaKit } from './media-base-kit';
import { BaseMentionKit } from './mention-base-kit';
import { BaseTocKit } from './toc-base-kit';
import { BaseToggleKit } from './toggle-base-kit';

export const BaseEditorKit = [
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
