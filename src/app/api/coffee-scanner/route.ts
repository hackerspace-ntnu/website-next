// import { headers } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import { eventEmitter } from '@/lib/api/eventEmitter';

export async function POST(request: NextRequest) {
  // const headersList = await headers();
  // const authHeader = headersList.get('Authorization');

  // if (!authHeader || authHeader !== `Bearer ${process.env.SERVICES_API_KEY}`) {
  //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  try {
    const body: { cardId?: string } = await request.json();
    const { cardId } = body;

    if (typeof cardId !== 'string') {
      return NextResponse.json(
        { error: '"cardId" must be a string' },
        { status: 400 },
      );
    }

    eventEmitter.emit('updateCoffee', cardId);

    return NextResponse.json({ message: 'Card ID sent successfully' });
  } catch (error) {
    console.error('Error processing coffee scan.', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
