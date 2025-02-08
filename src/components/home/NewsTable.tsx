import { Table, TableBody, TableCell, TableRow } from '@/components/ui/Table';
import type { articleMockData } from '@/mock-data/article';

type NewsTableProps = {
  articles: typeof articleMockData;
};

function NewsTable({ articles }: NewsTableProps) {
  return (
    <Table>
      <TableBody>
        {articles.map((article) => (
          <TableRow key={article.id}>
            <TableCell className='max-w-80 rounded-lg p-2'>
              <h3 className='truncate'>{article.title}</h3>
              <p className='truncate'>{article.date}</p>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { NewsTable };
