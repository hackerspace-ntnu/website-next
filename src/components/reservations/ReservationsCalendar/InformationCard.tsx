import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Plus } from 'lucide-react';

type InformationCardProps = {
  onClick: () => void;
};

export default function InformationCard({ onClick }: InformationCardProps) {
  return (
    <Card className='rounded-b-none'>
      <CardContent>
        <CardHeader>
          <CardTitle>Viktig informasjon</CardTitle>
          <CardDescription>
            Les{' '}
            <a className='text-primary' href='/regler/5'>
              regler for bruk av 3D-printer
            </a>{' '}
            før du starter.
            <br />
            <br />
            Ved å benytte reservasjonssystemet vårt setter vi av våre ressurser
            (både printer og folk på vakt som følger med).
            <br />
            Det er derfor forventet at du møter opp tidsnok (gjerne 5 minutter
            før avsatt tid) og ikke går over tiden du har booket.
          </CardDescription>
        </CardHeader>
        <Button variant='default' onClick={onClick}>
          <Plus className='mr-2 size-5' />
          Create Reservation
        </Button>
      </CardContent>
    </Card>
  );
}
