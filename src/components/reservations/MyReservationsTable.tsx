import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';

function MyReservationsTable() {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>My reservations</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell scope='row'>Equipment</TableCell>
            <TableCell align='right'>From</TableCell>
            <TableCell align='right'>To</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}

export { MyReservationsTable };
