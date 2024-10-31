import {
  Table,
  TableBody,
  TableCaption,
  TableRow,
} from '@/components/ui/Table';
import { useTransition } from 'react';

type Member = {
  name: string;
  image: string;
};

type MembersTableProps = {
  Members: Member[];
};

function MembersTable() {
  return (
    <div>
      <Table>
        <TableRow />
        <TableBody> name of a member </TableBody>
        <TableRow />
      </Table>
    </div>
  );
}

export { MembersTable };
