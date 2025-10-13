import { getEquationHtml } from '@platejs/math';
import { RadicalIcon } from 'lucide-react';
import type { SlateElementProps, TEquationElement } from 'platejs';
import { SlateElement } from 'platejs';
import { cx } from '@/lib/utils/index';

// Cannot be translated, as next-intl context is unavailable,
// and the component must be rendered synchronously to work with Plate.js
// HTML serialization. The lack of translations only affects exported files.
function EquationElementStatic(props: SlateElementProps<TEquationElement>) {
  const { element } = props;

  const html = getEquationHtml({
    element,
    options: {
      displayMode: true,
      errorColor: '#cc0000',
      fleqn: false,
      leqno: false,
      macros: { '\\f': '#1f(#2)' },
      output: 'htmlAndMathml',
      strict: 'warn',
      throwOnError: false,
      trust: false,
    },
  });

  return (
    <SlateElement className='my-1' {...props}>
      <div
        className={cx(
          'group flex select-none items-center justify-center rounded-sm hover:bg-primary/10 data-[selected=true]:bg-primary/10',
          element.texExpression.length === 0
            ? 'bg-muted p-3 pr-9'
            : 'px-2 py-1',
        )}
      >
        {element.texExpression.length > 0 ? (
          <span
            // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML content from @platejs/math is safe
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
        ) : (
          <div className='flex h-7 w-full items-center gap-2 whitespace-nowrap text-muted-foreground text-sm'>
            <RadicalIcon className='size-6 text-muted-foreground/80' />
            <div>Add a Tex equation</div>
          </div>
        )}
      </div>
      {props.children}
    </SlateElement>
  );
}

function InlineEquationElementStatic(
  props: SlateElementProps<TEquationElement>,
) {
  const html = getEquationHtml({
    element: props.element,
    options: {
      displayMode: true,
      errorColor: '#cc0000',
      fleqn: false,
      leqno: false,
      macros: { '\\f': '#1f(#2)' },
      output: 'htmlAndMathml',
      strict: 'warn',
      throwOnError: false,
      trust: false,
    },
  });

  return (
    <SlateElement
      {...props}
      className='inline-block select-none rounded-sm [&_.katex-display]:my-0'
    >
      <div
        className={cx(
          'after:-top-0.5 after:-left-1 after:absolute after:inset-0 after:z-1 after:h-[calc(100%)+4px] after:w-[calc(100%+8px)] after:rounded-sm after:content-[""]',
          'h-6',
          props.element.texExpression.length === 0 &&
            'text-muted-foreground after:bg-neutral-500/10',
        )}
      >
        <span
          className={cx(
            props.element.texExpression.length === 0 && 'hidden',
            'font-mono leading-none',
          )}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML content from @platejs/math is safe
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      {props.children}
    </SlateElement>
  );
}

export { EquationElementStatic, InlineEquationElementStatic };
