// import { headers } from 'next/headers';

import { addDays, startOfToday } from 'date-fns';
import { and, eq, gte, lt } from 'drizzle-orm';
import { type NextRequest, NextResponse } from 'next/server';
import { eventEmitter } from '@/lib/api/eventEmitter';
import { db } from '@/server/db';
import { coffeeScanner } from '@/server/db/tables';

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

    const entriesToday = await db
      .select()
      .from(coffeeScanner)
      .where(
        and(
          eq(coffeeScanner.cardId, cardId),
          eq(coffeeScanner.isChocolate, true),
          gte(coffeeScanner.createdAt, startOfToday()),
          lt(coffeeScanner.createdAt, addDays(startOfToday(), 1)),
        ),
      );

    // TODO: Differentiate between members and non members.
    if (entriesToday.length >= 2) {
      eventEmitter.emit('tooMuchChocolate', true);
    } else {
      eventEmitter.emit('tooMuchChocolate', false);
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
