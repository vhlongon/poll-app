import { db } from '@/db/db';
import Link from 'next/link';

export default async function Events() {
  const events = await db.query.events.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1>Events</h1>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <Link href={`event/${event.id}`}>{event.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
