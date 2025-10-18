import { Link } from '@/components/ui/Link';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/Table';
import type { RouterOutput } from '@/server/api';

type NewsTableProps = {
  articles: RouterOutput['news']['fetchArticles'];
};

function NewsTable({ articles }: NewsTableProps) {
  return (
    <Table>
      <TableBody>
        {articles.map((article) => (
          <TableRow key={article.id}>
            <TableCell className='max-w-80 rounded-lg p-0'>
              <Link
                variant='none'
                size='none'
                href={{
                  pathname: '/news/[articleId]',
                  params: { articleId: article.id },
                }}
                className='block p-2'
              >
                <h3 className='truncate'>{article.localization.title}</h3>
                <p className='truncate'>{article.localization.preamble}</p>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { NewsTable };
