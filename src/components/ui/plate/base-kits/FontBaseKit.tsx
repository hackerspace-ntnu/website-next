import {
  BaseFontBackgroundColorPlugin,
  BaseFontColorPlugin,
  BaseFontFamilyPlugin,
  BaseFontSizePlugin,
} from '@platejs/basic-styles';
import type { SlatePluginConfig } from 'platejs';
import { KEYS } from 'platejs';

const options = {
  inject: { targetPlugins: [KEYS.p] },
} satisfies SlatePluginConfig;

const BaseFontKit = [
  BaseFontColorPlugin.configure(options),
  BaseFontBackgroundColorPlugin.configure(options),
  BaseFontSizePlugin.configure(options),
  BaseFontFamilyPlugin.configure(options),
];

export { BaseFontKit };
