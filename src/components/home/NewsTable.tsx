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
            <TableCell className='w-80 rounded-lg p-2'>
              <h3 className='truncate'>{article.localization.title}</h3>
              <p className='truncate'>{article.localization.content}</p>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { NewsTable };
