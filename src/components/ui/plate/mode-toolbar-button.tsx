'use client';

import { SuggestionPlugin } from '@platejs/suggestion/react';
import {
  DropdownMenuItemIndicator,
  type DropdownMenuProps,
} from '@radix-ui/react-dropdown-menu';
import { CheckIcon, EyeIcon, PencilLineIcon, PenIcon } from 'lucide-react';
import { useEditorRef, usePlateState, usePluginOption } from 'platejs/react';
import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { ToolbarButton } from './toolbar';

export function ModeToolbarButton(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const [readOnly, setReadOnly] = usePlateState('readOnly');
  const [open, setOpen] = React.useState(false);

  const isSuggesting = usePluginOption(SuggestionPlugin, 'isSuggesting');

  let value = 'editing';

  if (readOnly) value = 'viewing';

  if (isSuggesting) value = 'suggestion';

  const item: Record<string, { icon: React.ReactNode; label: string }> = {
    editing: {
      icon: <PenIcon className='h-5 w-5' />,
      label: 'Editing',
    },
    suggestion: {
      icon: <PencilLineIcon className='h-5 w-5' />,
      label: 'Suggestion',
    },
    viewing: {
      icon: <EyeIcon className='h-5 w-5' />,
      label: 'Viewing',
    },
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={open} tooltip='Editing mode' isDropdown>
          {item[value]?.icon}
          <span className='hidden lg:inline'>{item[value]?.label}</span>
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='min-w-[180px]' align='start'>
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(newValue) => {
            if (newValue === 'viewing') {
              setReadOnly(true);

              return;
            }
            setReadOnly(false);

            if (newValue === 'suggestion') {
              editor.setOption(SuggestionPlugin, 'isSuggesting', true);

              return;
            }
            editor.setOption(SuggestionPlugin, 'isSuggesting', false);

            if (newValue === 'editing') {
              editor.tf.focus();

              return;
            }
          }}
        >
          <DropdownMenuRadioItem
            className='flex gap-2 pl-2 *:first:[span]:hidden *:[svg]:text-muted-foreground'
            value='editing'
          >
            <Indicator />
            {item.editing?.icon}
            {item.editing?.label}
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem
            className='flex gap-2 pl-2 *:first:[span]:hidden *:[svg]:text-muted-foreground'
            value='viewing'
          >
            <Indicator />
            {item.viewing?.icon}
            {item.viewing?.label}
          </DropdownMenuRadioItem>

          {/* <DropdownMenuRadioItem
            className='flex gap-2 pl-2 *:first:[span]:hidden *:[svg]:text-muted-foreground'
            value='suggestion'
          >
            <Indicator />
            {item.suggestion?.icon}
            {item.suggestion?.label}
          </DropdownMenuRadioItem> */}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Indicator() {
  return (
    <span className='pointer-events-none absolute right-2 flex size-3.5 items-center justify-center'>
      <DropdownMenuItemIndicator>
        <CheckIcon />
      </DropdownMenuItemIndicator>
    </span>
  );
}
