import { Table, TableBody, TableCell, TableRow } from '@/components/ui/Table';
import { useRouter } from '@/lib/locale/navigation';
import { events } from '@/mock-data/events';
import { useLocale } from 'next-intl';

type RecentTableProps = {
  title: string;
  description: string;
};

function RecentTable({ title, description }: RecentTableProps) {
  return (
    <Table>
      <TableBody>
        {events.slice(0, 3).map((event) => (
          <TableRow key={event.id}>
            <TableCell className='max-w-80 rounded-lg p-1'>
              <h3 className='truncate'>{event.title}</h3>
              <p className='truncate'>{event.subheader}</p>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { RecentTable };
