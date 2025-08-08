'use client';

import { CaptionPlugin } from '@platejs/caption/react';
import {
  AudioPlugin,
  FilePlugin,
  ImagePlugin,
  MediaEmbedPlugin,
  PlaceholderPlugin,
  VideoPlugin,
} from '@platejs/media/react';
import { KEYS } from 'platejs';
import { AudioElement } from '@/components/ui/plate/MediaAudioNode';
import { MediaEmbedElement } from '@/components/ui/plate/MediaEmbedNode';
import { FileElement } from '@/components/ui/plate/MediaFileNode';
import { ImageElement } from '@/components/ui/plate/MediaImageNode';
import { PlaceholderElement } from '@/components/ui/plate/MediaPlaceholderNode';
import { MediaPreviewDialog } from '@/components/ui/plate/MediaPreviewDialog';
import { MediaUploadToast } from '@/components/ui/plate/MediaUploadToast';
import { VideoElement } from '@/components/ui/plate/MediaVideoNode';

const MediaKit = [
  ImagePlugin.configure({
    options: { disableUploadInsert: true },
    render: { afterEditable: MediaPreviewDialog, node: ImageElement },
  }),
  MediaEmbedPlugin.withComponent(MediaEmbedElement),
  VideoPlugin.withComponent(VideoElement),
  AudioPlugin.withComponent(AudioElement),
  FilePlugin.withComponent(FileElement),
  PlaceholderPlugin.configure({
    options: {
      disableEmptyPlaceholder: true,
      uploadConfig: {
        audio: {
          maxFileCount: 1,
          maxFileSize: '64MB',
          mediaType: KEYS.audio,
          minFileCount: 1,
        },
        blob: {
          maxFileCount: 1,
          maxFileSize: '64MB',
          mediaType: KEYS.file,
          minFileCount: 1,
        },
        image: {
          maxFileCount: 3,
          maxFileSize: '64MB',
          mediaType: KEYS.img,
          minFileCount: 1,
        },
        pdf: {
          maxFileCount: 1,
          maxFileSize: '64MB',
          mediaType: KEYS.file,
          minFileCount: 1,
        },
        text: {
          maxFileCount: 1,
          maxFileSize: '64MB',
          mediaType: KEYS.file,
          minFileCount: 1,
        },
        video: {
          maxFileCount: 1,
          maxFileSize: '64MB',
          mediaType: KEYS.video,
          minFileCount: 1,
        },
      },
    },
    render: { afterEditable: MediaUploadToast, node: PlaceholderElement },
  }),
  CaptionPlugin.configure({
    options: {
      query: {
        allow: [KEYS.img, KEYS.video, KEYS.audio, KEYS.file, KEYS.mediaEmbed],
      },
    },
  }),
];

export { MediaKit };
