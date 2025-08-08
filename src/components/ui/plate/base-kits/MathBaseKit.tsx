import { BaseEquationPlugin, BaseInlineEquationPlugin } from '@platejs/math';
import {
  EquationElementStatic,
  InlineEquationElementStatic,
} from '@/components/ui/plate/EquationNodeStatic';

const BaseMathKit = [
  BaseInlineEquationPlugin.withComponent(InlineEquationElementStatic),
  BaseEquationPlugin.withComponent(EquationElementStatic),
];

export { BaseMathKit };
