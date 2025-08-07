import { BaseEquationPlugin, BaseInlineEquationPlugin } from '@platejs/math';
import {
  EquationElementStatic,
  InlineEquationElementStatic,
} from '@/components/ui/plate/EquationNodeStatic';

export const BaseMathKit = [
  BaseInlineEquationPlugin.withComponent(InlineEquationElementStatic),
  BaseEquationPlugin.withComponent(EquationElementStatic),
];
