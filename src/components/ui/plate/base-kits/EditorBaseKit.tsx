import { MarkdownKit } from '../kits/MarkdownKit';
import { BaseAlignKit } from './AlignBaseKit';
import { BaseBasicBlocksKit } from './BasicBlocksBaseKit';
import { BaseBasicMarksKit } from './BasicMarksBaseKit';
import { BaseCalloutKit } from './CalloutBaseKit';
import { BaseCodeBlockKit } from './CodeBlockBaseKit';
import { BaseColumnKit } from './ColumnBaseKit';
import { BaseDateKit } from './DateBaseKit';
import { BaseFontKit } from './FontBaseKit';
import { BaseLineHeightKit } from './LineHeightBaseKit';
import { BaseLinkKit } from './LinkBaseKit';
import { BaseListKit } from './ListBaseKit';
import { BaseMathKit } from './MathBaseKit';
import { BaseMediaKit } from './MediaBaseKit';
import { BaseMentionKit } from './MentionBaseKit';
import { BaseTableKit } from './TableBaseKit';
import { BaseTocKit } from './TocBaseKit';
import { BaseToggleKit } from './ToggleBaseKit';

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
