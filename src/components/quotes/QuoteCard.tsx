import { getFormatter, getLocale, getTranslations } from 'next-intl/server';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { api } from '@/lib/api/server';
import type { RouterOutput } from '@/server/api';

async function QuoteCard({
  quote,
}: {
  quote: RouterOutput['quotes']['getQuotes'][number];
}) {
  const locale = await getLocale();
  const formatter = await getFormatter();
  const tLayout = await getTranslations('layout');
  const t = await getTranslations('quotes');
  const profileImageUrl = quote?.saidBy.profilePictureId
    ? await api.utils.getFileUrl({ fileId: quote.saidBy.profilePictureId })
    : null;

  const saidByName = `${quote.saidBy.firstName} ${quote.saidBy.lastName}`;
  const heardByName = `${quote.heardBy.firstName} ${quote.heardBy.lastName}`;

  return (
    <Card key={`quote-${quote.id}`} className='overflow-hidden'>
      <CardHeader className='bg-muted/50 p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Avatar>
              {profileImageUrl && (
                <AvatarImage
                  src={profileImageUrl}
                  alt={`${saidByName}'s profile`}
                />
              )}
              <AvatarFallback>
                {saidByName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className='font-medium'>{saidByName}</p>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <Badge variant='outline'>
              {formatter.dateTime(new Date(quote.createdAt))}
            </Badge>
            {quote.internal && (
              <Badge className='justify-center rounded-full'>
                {tLayout('internal')}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className='pt-4'>
        <blockquote className='border-primary/30 border-l-4 pl-4 text-lg italic'>
          {locale === 'en-GB' ? quote.contentEnglish : quote.contentNorwegian}
        </blockquote>
        {heardByName !== saidByName && (
          <span className='mt-4 text-muted-foreground'>
            {t('heardByUser', { user: heardByName })}
          </span>
        )}
      </CardContent>
    </Card>
  );
}

export { QuoteCard };
