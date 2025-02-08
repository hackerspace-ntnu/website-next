import { Table, TableBody, TableCell, TableRow } from '@/components/ui/Table';
import type { events } from '@/mock-data/events';

type EventTableProps = {
  events: typeof events;
};

function EventTable({ events }: EventTableProps) {
  return (
    <Table>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell className='max-w-80 rounded-lg p-2'>
              <h3 className='truncate'>{event.title}</h3>
              <p className='truncate'>{event.subheader}</p>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { EventTable };
