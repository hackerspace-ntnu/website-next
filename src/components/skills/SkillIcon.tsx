'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import type { skillIdentifiers } from '@/lib/constants';
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
import type { NestedKeyOf } from 'next-intl';
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

function SkillIcon({
  identifier,
}: { identifier: (typeof skillIdentifiers)[number] }) {
  const t = useTranslations('skills');

  const config = skillIconsConfig[identifier];

  if (!config) return null;

  const { icon: Icon, className } = config;

  return (
    <SkillIconTooltipTemplate
      tooltip={t(identifier as NestedKeyOf<Messages['skills']>)}
    >
      <Icon className={`h-4 w-4 ${className}`} />
    </SkillIconTooltipTemplate>
  );
}

export { SkillIcon };
