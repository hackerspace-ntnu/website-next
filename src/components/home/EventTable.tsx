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
            <TableCell className='max-w-80 rounded-lg p-2'>
              <h3 className='truncate'>{event.localization.name}</h3>
              <p className='truncate'>{event.localization.summary}</p>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { EventTable };
