import { Link } from '@/components/ui/Link';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/Table';
import type { RouterOutput } from '@/server/api';

type EventTableProps = {
  events: RouterOutput['events']['fetchEvents'];
};

function EventTable({ events }: EventTableProps) {
  return (
    <Table className='table-fixed'>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell className='max-w-80 rounded-lg p-0'>
              <Link
                variant='none'
                size='none'
                href={{
                  pathname: '/events/[eventId]',
                  params: { eventId: event.id },
                }}
                className='block rounded-xl p-2 focus-visible:ring-inset'
              >
                <h3 className='truncate'>{event.localization.name}</h3>
                <p className='truncate'>{event.localization.summary}</p>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { EventTable };
