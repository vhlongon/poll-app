import { db } from '@/db/db';
import Link from 'next/link';
import { formatDate } from '../utils/utils';
import { EventDeleteModal } from '../components/EventDeleteModal';

export const dynamic = 'force-dynamic';

export default async function Events() {
  const events = await db.query.events.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 dragon-bg">
      {events.length === 0 ? (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold mb-4 font-accent dnd-heading">
            No events created yet
          </h1>
          <Link className="btn btn-accent btn-sm max-w-28" href="/">
            Create one
          </Link>
        </div>
      ) : (
        <div className="card bg-base-100 shadow-xl shadow-stone-950 max-w-[calc(100vw-2rem)] sm:max-w-full">
          <div className="card-body items-center text-center font-accent">
            <h1 className="text-3xl font-bold mb-4 dnd-heading">Events</h1>
            <div className="overflow-x-auto">
              <table className="table table-xs sm:table-sm font-main">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Created by</th>
                    <th>Created at</th>
                    <th>actions</th>
                  </tr>
                </thead>
                <tbody className="font-main">
                  {events.map(event => (
                    <tr key={event.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="font-bold">{event.name}</div>
                        </div>
                      </td>
                      <td>{event.author}</td>
                      <td>{formatDate(event.createdAt)}</td>
                      <td className="flex gap-2">
                        <Link
                          className="btn btn-accent btn-sm"
                          href={`event/${event.id}`}
                        >
                          See
                        </Link>
                        <EventDeleteModal id={event.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
