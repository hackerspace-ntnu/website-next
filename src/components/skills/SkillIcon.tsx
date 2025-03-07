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

function SkillIcon({
  identifier,
}: { identifier: (typeof skillIdentifiers)[number] }) {
  const t = useTranslations();

  switch (identifier) {
    case 'printing':
      return (
        <SkillIconTooltipTemplate tooltip={t('printing')}>
          <BoxIcon className='h-4 w-4 bg-green-100 text-green-600' />
        </SkillIconTooltipTemplate>
      );
    case 'soldering':
      return (
        <SkillIconTooltipTemplate tooltip={t('soldering')}>
          <WrenchIcon className='h-4 w-4 bg-yellow-100 text-yellow-600' />
        </SkillIconTooltipTemplate>
      );
    case 'raspberry':
      return (
        <SkillIconTooltipTemplate tooltip={t('raspberry')}>
          <CircuitBoardIcon className='h-4 w-4 text-pink-600' />
        </SkillIconTooltipTemplate>
      );
    case 'unix':
      return (
        <SkillIconTooltipTemplate tooltip={t('unix')}>
          <TerminalIcon className='h-4 w-4 text-slate-100 text-slate-600' />
        </SkillIconTooltipTemplate>
      );
    case 'laser':
      return (
        <SkillIconTooltipTemplate tooltip={t('laser')}>
          <ZapIcon className='h-4 w-4 text-red-100 text-red-600' />
        </SkillIconTooltipTemplate>
      );
    case 'workshop':
      return (
        <SkillIconTooltipTemplate tooltip={t('workshop')}>
          <CoffeeIcon className='h-4 w-4 text-amber-100 text-amber-600' />
        </SkillIconTooltipTemplate>
      );
    case 'microcontroller':
      return (
        <SkillIconTooltipTemplate tooltip={t('microcontroller')}>
          <CpuIcon className='h-4 w-4 text-blue-100 text-blue-600' />
        </SkillIconTooltipTemplate>
      );
    case 'webdevelopment':
      return (
        <SkillIconTooltipTemplate tooltip={t('webdevelopment')}>
          <CodeIcon className='h-4 w-4 text-violet-100 text-violet-600' />
        </SkillIconTooltipTemplate>
      );
    default:
      return null;
  }
}

export { SkillIcon };
