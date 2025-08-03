import {
  BoxIcon,
  CheckCheckIcon,
  CircuitBoardIcon,
  CodeIcon,
  CoffeeIcon,
  CpuIcon,
  TerminalIcon,
  WrenchIcon,
  ZapIcon,
} from 'lucide-react';
import { getLocale } from 'next-intl/server';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { cx } from '@/lib/utils';
import type { SelectSkill } from '@/server/db/tables';

function SkillIconTooltipTemplate({
  children,
  tooltip,
}: {
  children: React.ReactNode;
  tooltip: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className='inline-flex cursor-default'>{children}</div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

const skillIconsConfig: Record<
  string,
  { icon: React.ElementType; className: string }
> = {
  printing: {
    icon: BoxIcon,
    className: 'bg-green-100 text-green-600',
  },
  soldering: {
    icon: WrenchIcon,
    className: 'bg-yellow-100 text-yellow-600',
  },
  raspberry: {
    icon: CircuitBoardIcon,
    className: 'bg-pink-100 text-pink-600',
  },
  unix: {
    icon: TerminalIcon,
    className: 'bg-slate-100 text-slate-600',
  },
  laser: {
    icon: ZapIcon,
    className: 'bg-red-100 text-red-600',
  },
  workshop: {
    icon: CoffeeIcon,
    className: 'bg-amber-100 text-amber-600',
  },
  microcontroller: {
    icon: CpuIcon,
    className: 'bg-blue-100 text-blue-600',
  },
  webdevelopment: {
    icon: CodeIcon,
    className: 'bg-violet-100 text-violet-600',
  },
};

type SkillIconProps = {
  skill: SelectSkill;
  size?: 'small' | 'medium' | 'large';
};

async function SkillIcon({ skill, size = 'medium' }: SkillIconProps) {
  const config = skillIconsConfig[skill.identifier];
  const locale = await getLocale();

  const { icon: Icon, className } = config ?? {};

  return (
    <SkillIconTooltipTemplate
      tooltip={locale === 'en-GB' ? skill.nameEnglish : skill.nameNorwegian}
    >
      <span
        className={cx(
          'rounded-full opacity-75',
          {
            'max-h-4 min-h-4 min-w-4 max-w-4 p-0.5': size === 'small',
            'max-h-5 min-h-5 min-w-5 max-w-5 p-[3px]': size === 'medium',
            'max-h-6 min-h-6 min-w-6 max-w-6 p-1': size === 'large',
          },
          className ?? 'bg-gray-100 text-black',
        )}
      >
        {Icon ? (
          <Icon
            className={cx({
              'h-3 w-3': size === 'small',
              'h-3.5 w-3.5': size === 'medium',
              'h-4 w-4': size === 'large',
            })}
          />
        ) : (
          <CheckCheckIcon
            className={cx({
              'h-3 w-3': size === 'small',
              'h-3.5 w-3.5': size === 'medium',
              'h-4 w-4': size === 'large',
            })}
          />
        )}
      </span>
    </SkillIconTooltipTemplate>
  );
}

export { SkillIcon };
