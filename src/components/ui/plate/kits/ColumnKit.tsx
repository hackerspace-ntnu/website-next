'use client';

import { ColumnItemPlugin, ColumnPlugin } from '@platejs/layout/react';
import {
  ColumnElement,
  ColumnGroupElement,
} from '@/components/ui/plate/ColumnNode';

const ColumnKit = [
  ColumnPlugin.withComponent(ColumnGroupElement),
  ColumnItemPlugin.withComponent(ColumnElement),
];

export { ColumnKit };
