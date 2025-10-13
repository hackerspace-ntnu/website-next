import { BaseCaptionPlugin } from '@platejs/caption';
import {
  BaseAudioPlugin,
  BaseFilePlugin,
  BaseImagePlugin,
  BaseMediaEmbedPlugin,
  BasePlaceholderPlugin,
  BaseVideoPlugin,
} from '@platejs/media';
import { KEYS } from 'platejs';
import { AudioElementStatic } from '@/components/ui/plate/MediaAudioNodeStatic';
import { FileElementStatic } from '@/components/ui/plate/MediaFileNodeStatic';
import { ImageElementStatic } from '@/components/ui/plate/MediaImageNodeStatic';
import { VideoElementStatic } from '@/components/ui/plate/MediaVideoNodeStatic';

const BaseMediaKit = [
  BaseImagePlugin.withComponent(ImageElementStatic),
  BaseVideoPlugin.withComponent(VideoElementStatic),
  BaseAudioPlugin.withComponent(AudioElementStatic),
  BaseFilePlugin.withComponent(FileElementStatic),
  BaseCaptionPlugin.configure({
    options: {
      query: {
        allow: [KEYS.img, KEYS.video, KEYS.audio, KEYS.file, KEYS.mediaEmbed],
      },
    },
  }),
  BaseMediaEmbedPlugin,
  BasePlaceholderPlugin,
];

export { BaseMediaKit };
