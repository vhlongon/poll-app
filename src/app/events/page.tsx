import { db } from '@/db/db';
import Link from 'next/link';
import { formatDate } from '../utils/utils';

export default async function Events() {
  const events = await db.query.events.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      {events.length === 0 ? (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold mb-4">No events created yet</h1>
          <Link className="btn btn-accent btn-sm max-w-28" href="/">
            Create one
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4">Events</h1>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Created by</th>
                  <th>Created at</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => (
                  <tr key={event.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="font-bold">{event.name}</div>
                      </div>
                    </td>
                    <td>{event.author}</td>
                    <td>{formatDate(event.createdAt)}</td>
                    <td>
                      <Link
                        className="btn btn-accent btn-sm"
                        href={`event/${event.id}`}
                      >
                        Go to event
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}
