import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { api } from '@/lib/api/server';
import { format } from 'date-fns';
import { setRequestLocale } from 'next-intl/server';

export default async function QuotesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const quotes = await api.quotes.getQuotes();

  return (
    <div className='container space-y-8 py-10'>
      <h1 className='font-bold text-3xl tracking-tight'>
        Inspirational Quotes
      </h1>

      <div className='grid gap-6'>
        {quotes.map(async (quote) => {
          const profileImageUrl = quote?.profilePictureId
            ? await api.utils.getFileUrl({ fileId: quote.profilePictureId })
            : null;

          return (
            <Card key={`quote-${quote.id}`} className='overflow-hidden'>
              <CardHeader className='bg-muted/50 pb-3'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Avatar>
                      {profileImageUrl && (
                        <AvatarImage
                          src={profileImageUrl}
                          alt={`${typeof quote.author === 'string' ? quote.author : 'Unknown'}'s profile`}
                        />
                      )}
                      <AvatarFallback>
                        {typeof quote.author === 'string'
                          ? quote.author.substring(0, 2).toUpperCase()
                          : 'UN'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='font-medium'>
                        {typeof quote.author === 'string'
                          ? quote.author
                          : 'Unknown Author'}
                      </p>
                    </div>
                  </div>
                  <Badge variant='outline'>
                    {format(new Date(quote.createdAt), 'MMM d, yyyy')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className='pt-4'>
                <blockquote className='border-primary/30 border-l-4 pl-4 text-lg italic'>
                  {quote.content}
                </blockquote>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
