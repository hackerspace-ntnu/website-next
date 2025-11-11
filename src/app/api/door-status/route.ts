import { headers } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { doorStatus } from '@/server/db/tables';

export async function POST(request: NextRequest) {
  const headersList = await headers();
  const authHeader = headersList.get('Authorization');

  if (!authHeader || authHeader !== `Bearer ${process.env.SERVICES_API_KEY}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body: { status?: boolean } = await request.json();
    const { status } = body;

    if (typeof status !== 'boolean') {
      return NextResponse.json(
        { error: '"status" must be a boolean' },
        { status: 400 },
      );
    }

    await db.insert(doorStatus).values({
      status,
    });

    return NextResponse.json({ message: 'Door status updated successfully' });
  } catch (error) {
    console.error('Error processing door status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
