import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import type { skillIdentifiers } from '@/lib/constants';
import { cx } from '@/lib/utils';
import {
  BoxIcon,
  CircuitBoardIcon,
  CodeIcon,
  CoffeeIcon,
  CpuIcon,
  TerminalIcon,
  WrenchIcon,
  ZapIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

function SkillIconTooltipTemplate({
  children,
  tooltip,
}: { children: React.ReactNode; tooltip: string }) {
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

const skillIconsConfig = {
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
  identifier: (typeof skillIdentifiers)[number];
  size?: 'small' | 'medium' | 'large';
};

function SkillIcon({ identifier, size = 'medium' }: SkillIconProps) {
  const t = useTranslations('skills');

  const config = skillIconsConfig[identifier];

  if (!config) return null;

  const { icon: Icon, className } = config;

  return (
    <SkillIconTooltipTemplate tooltip={t(identifier)}>
      <span
        className={cx(
          'rounded-full opacity-75',
          {
            'max-h-4 min-h-4 min-w-4 max-w-4 p-0.5': size === 'small',
            'max-h-5 min-h-5 min-w-5 max-w-5 p-[3px]': size === 'medium',
            'max-h-6 min-h-6 min-w-6 max-w-6 p-1': size === 'large',
          },
          className,
        )}
      >
        <Icon
          className={cx({
            'h-3 w-3': size === 'small',
            'h-3.5 w-3.5': size === 'medium',
            'h-4 w-4': size === 'large',
          })}
        />
      </span>
    </SkillIconTooltipTemplate>
  );
}

export { SkillIcon };
