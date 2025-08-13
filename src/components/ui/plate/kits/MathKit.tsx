'use client';

import { EquationPlugin, InlineEquationPlugin } from '@platejs/math/react';

import {
  EquationElement,
  InlineEquationElement,
} from '@/components/ui/plate/EquationNode';

const MathKit = [
  InlineEquationPlugin.withComponent(InlineEquationElement),
  EquationPlugin.withComponent(EquationElement),
];

export { MathKit };
