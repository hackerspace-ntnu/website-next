'use client';

import { parseTwitterUrl, parseVideoUrl } from '@platejs/media';
import { MediaEmbedPlugin, useMediaState } from '@platejs/media/react';
import { ResizableProvider, useResizableValue } from '@platejs/resizable';
import { useTranslations } from 'next-intl';
import type { TMediaEmbedElement } from 'platejs';
import type { PlateElementProps } from 'platejs/react';
import { PlateElement, withHOC } from 'platejs/react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import { Tweet } from 'react-tweet';
import { Caption, CaptionTextarea } from '@/components/ui/plate/Caption';
import { MediaToolbar } from '@/components/ui/plate/MediaToolbar';
import {
  mediaResizeHandleVariants,
  Resizable,
  ResizeHandle,
} from '@/components/ui/plate/ResizeHandle';
import { cx } from '@/lib/utils';

const MediaEmbedElement = withHOC(
  ResizableProvider,
  function MediaEmbedElement(props: PlateElementProps<TMediaEmbedElement>) {
    const {
      align = 'center',
      embed,
      focused,
      isTweet,
      isVideo,
      isYoutube,
      readOnly,
      selected,
    } = useMediaState({
      urlParsers: [parseTwitterUrl, parseVideoUrl],
    });
    const width = useResizableValue('width');
    const provider = embed?.provider;
    const t = useTranslations('ui.plate');

    if (!embed?.id) return null;

    return (
      <MediaToolbar plugin={MediaEmbedPlugin}>
        <PlateElement className='py-2.5' {...props}>
          <figure
            className='group relative m-0 w-full cursor-default'
            contentEditable={false}
          >
            <Resizable
              align={align}
              options={{
                align,
                maxWidth: isTweet ? 550 : '100%',
                minWidth: isTweet ? 300 : 100,
              }}
            >
              <ResizeHandle
                className={mediaResizeHandleVariants({ direction: 'left' })}
                options={{ direction: 'left' }}
              />

              {isVideo ? (
                isYoutube ? (
                  <LiteYouTubeEmbed
                    id={embed.id}
                    title='youtube'
                    wrapperClass={cx(
                      'rounded-sm',
                      focused && selected && 'ring-2 ring-ring ring-offset-2',
                      'relative block cursor-pointer bg-black bg-center bg-cover [contain:content]',
                      '[&.lyt-activated]:before:absolute [&.lyt-activated]:before:top-0 [&.lyt-activated]:before:h-[60px] [&.lyt-activated]:before:w-full [&.lyt-activated]:before:bg-top [&.lyt-activated]:before:bg-repeat-x [&.lyt-activated]:before:pb-[50px] [&.lyt-activated]:before:[transition:all_0.2s_cubic-bezier(0,_0,_0.2,_1)]',
                      '[&.lyt-activated]:before:bg-[url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==)]',
                      'after:block after:pb-[var(--aspect-ratio)] after:content-[""]',
                      '[&_>_iframe]:absolute [&_>_iframe]:top-0 [&_>_iframe]:left-0 [&_>_iframe]:size-full',
                      '[&_>_.lty-playbtn]:z-1 [&_>_.lty-playbtn]:h-[46px] [&_>_.lty-playbtn]:w-[70px] [&_>_.lty-playbtn]:rounded-[14%] [&_>_.lty-playbtn]:bg-[#212121] [&_>_.lty-playbtn]:opacity-80 [&_>_.lty-playbtn]:[transition:all_0.2s_cubic-bezier(0,_0,_0.2,_1)]',
                      '[&:hover_>_.lty-playbtn]:bg-[red] [&:hover_>_.lty-playbtn]:opacity-100',
                      '[&_>_.lty-playbtn]:before:border-[transparent_transparent_transparent_#fff] [&_>_.lty-playbtn]:before:border-y-[11px] [&_>_.lty-playbtn]:before:border-r-0 [&_>_.lty-playbtn]:before:border-l-[19px] [&_>_.lty-playbtn]:before:content-[""]',
                      '[&_>_.lty-playbtn]:absolute [&_>_.lty-playbtn]:top-1/2 [&_>_.lty-playbtn]:left-1/2 [&_>_.lty-playbtn]:[transform:translate3d(-50%,-50%,0)]',
                      '[&_>_.lty-playbtn]:before:absolute [&_>_.lty-playbtn]:before:top-1/2 [&_>_.lty-playbtn]:before:left-1/2 [&_>_.lty-playbtn]:before:[transform:translate3d(-50%,-50%,0)]',
                      '[&.lyt-activated]:cursor-[unset]',
                      '[&.lyt-activated]:before:pointer-events-none [&.lyt-activated]:before:opacity-0',
                      '[&.lyt-activated_>_.lty-playbtn]:pointer-events-none [&.lyt-activated_>_.lty-playbtn]:opacity-0!',
                    )}
                  />
                ) : (
                  <div
                    className={cx(
                      provider === 'vimeo' && 'pb-[75%]',
                      provider === 'youku' && 'pb-[56.25%]',
                      provider === 'dailymotion' && 'pb-[56.0417%]',
                      provider === 'coub' && 'pb-[51.25%]',
                    )}
                  >
                    <iframe
                      className={cx(
                        'absolute top-0 left-0 size-full rounded-sm',
                        isVideo && 'border-0',
                        focused && selected && 'ring-2 ring-ring ring-offset-2',
                      )}
                      title='embed'
                      src={embed.url}
                      allowFullScreen
                    />
                  </div>
                )
              ) : null}

              {isTweet && (
                <div
                  className={cx(
                    '[&_.react-tweet-theme]:my-0',
                    !readOnly &&
                      selected &&
                      '[&_.react-tweet-theme]:ring-2 [&_.react-tweet-theme]:ring-ring [&_.react-tweet-theme]:ring-offset-2',
                  )}
                >
                  <Tweet id={embed.id} />
                </div>
              )}

              <ResizeHandle
                className={mediaResizeHandleVariants({ direction: 'right' })}
                options={{ direction: 'right' }}
              />
            </Resizable>

            <Caption style={{ width }} align={align}>
              <CaptionTextarea placeholder={t('writeACaption')} />
            </Caption>
          </figure>

          {props.children}
        </PlateElement>
      </MediaToolbar>
    );
  },
);

export { MediaEmbedElement };
