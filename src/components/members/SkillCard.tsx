import { MailIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Link } from '@/lib/locale/navigation';
import { cx } from '@/lib/utils';

import { InternalBadge } from '@/components/members/InternalBadge';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';

type SkillCardProps = {
  className?: string;
  id: number;
  internal: boolean;
  name: string;
  group: string;
  photoUrl: string;
  bio: string;
  mail: string;
  instagram: string;
  discord: string;
  github: string;
  linkedin: string;
  workshop: boolean;
  printing: boolean;
  lazercutter: boolean;
  linuxTerminal: boolean;
};

function SkillCard({
  className,
  id,
  internal,
  name,
  group,
  photoUrl,
  bio,
  mail,
  instagram,
  discord,
  github,
  linkedin,
  workshop,
  printing,
  lazercutter,
  linuxTerminal,
}: SkillCardProps) {
  const t = useTranslations('members.skills');
  return (
    <Card className='relative flex w-4/5 overflow-hidden rounded-xl'>
      <div className='flex w-full flex-col items-center justify-center'>
        <h3 className='mt-4 text-center'>Skills</h3>
        <ul className='mt-5 mb-7 flex grid grid-cols-4 flex-wrap justify-center gap-2 sm:grid sm:grid-cols-3-auto md:grid-flow-col md:grid-cols-auto xl:grid-flow-col xl:grid-cols-auto'>
          <li>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant='ghost' size='sm-icon'>
                    <MailIcon className='size-28' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className='bg-background'>
                  <p>{t('arduinoMicrocontrollers')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
          <li>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant='ghost' size='sm-icon'>
                    <MailIcon className='size-28' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className='bg-background'>
                  <p>{t('rasberryPi')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
          <li>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant='ghost' size='sm-icon'>
                    <MailIcon className='size-28' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className='bg-background'>
                  <p>{t('linuxTerminal')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
          <li>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant='ghost' size='sm-icon'>
                    <MailIcon className='size-28' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className='bg-background'>
                  <p>{t('workshop')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
          <li>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant='ghost' size='sm-icon'>
                    <MailIcon className='size-28' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className='bg-background'>
                  <p>{t('3dPrinting')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
          <li>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant='ghost' size='sm-icon'>
                    <MailIcon className='size-28' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className='bg-background'>
                  <p>{t('solderingSmallElectronics')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
          <li>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant='ghost' size='sm-icon'>
                    <MailIcon className='size-28' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className='bg-background'>
                  <p>{t('laserCutting')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </div>
    </Card>
  );
}

export { SkillCard, type SkillCardProps };
