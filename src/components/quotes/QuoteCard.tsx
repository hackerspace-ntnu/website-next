import { EditIcon } from 'lucide-react';
import { getFormatter, getTranslations } from 'next-intl/server';
import { MemberAvatar } from '@/components/members/MemberAvatar';
import { DeleteQuoteButton } from '@/components/quotes/DeleteQuoteButton';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';
import type { RouterOutput } from '@/server/api';

async function QuoteCard({
  currentUser,
  quote,
}: {
  currentUser: RouterOutput['auth']['state']['user'];
  quote: RouterOutput['quotes']['fetchQuotes'][number];
}) {
  const formatter = await getFormatter();
  const tLayout = await getTranslations('layout');
  const tUi = await getTranslations('ui');
  const t = await getTranslations('quotes');

  const profileImageUrl = quote?.saidBy.profilePictureId
    ? await api.utils.getFileUrl({ fileId: quote.saidBy.profilePictureId })
    : null;

  const saidByName = `${quote.saidBy.firstName} ${quote.saidBy.lastName}`;
  const heardByName = `${quote.heardBy.firstName} ${quote.heardBy.lastName}`;

  const userInvolved =
    quote.saidBy.id === currentUser?.id || quote.heardBy.id === currentUser?.id;
  const hasEditPermissions = currentUser?.groups.some((g) =>
    ['labops', 'management', 'admin'].includes(g),
  );
  const canEdit = userInvolved || hasEditPermissions;

  if (!quote.localization) return null;

  return (
    <Card key={quote.id} className='overflow-hidden'>
      <CardHeader className='bg-muted/50 p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <MemberAvatar
              user={quote.saidBy}
              profilePictureUrl={profileImageUrl}
            />
            <div>
              <p className='font-medium'>{saidByName}</p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            {canEdit && (
              <>
                <Link
                  href={{
                    pathname: '/quotes/[quoteId]/edit',
                    params: { quoteId: quote.id },
                  }}
                  variant='default'
                  size='sm-icon'
                >
                  <EditIcon />
                </Link>
                <DeleteQuoteButton
                  quote={quote}
                  t={{
                    title: t('delete.title'),
                    description: t('delete.description'),
                    cancel: tUi('cancel'),
                    confirm: tUi('confirm'),
                    success: t('delete.success'),
                  }}
                />
              </>
            )}
            <div className='flex flex-col gap-2'>
              <Badge variant='outline'>
                {formatter.dateTime(quote.createdAt)}
              </Badge>
              {quote.internal && (
                <Badge className='justify-center rounded-full'>
                  {tLayout('internal')}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-4 p-6'>
        <blockquote className='max-w-prose border-primary/30 border-l-4 pl-4 text-lg italic'>
          {quote.localization.content}
        </blockquote>
        {heardByName !== saidByName && (
          <span className='text-muted-foreground'>
            {t('heardByUser', { user: heardByName })}
          </span>
        )}
      </CardContent>
    </Card>
  );
}

export { QuoteCard };
