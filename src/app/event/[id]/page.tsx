import { db } from '@/db/db';
import { events, timeSuggestions } from '@/db/schema';
import { eq } from 'drizzle-orm';

type Event = typeof events.$inferSelect;
type TimeSuggestion = typeof timeSuggestions.$inferSelect;
type AggrecatedData = Record<
  string,
  Event & {
    timeSuggestions: TimeSuggestion[];
  }
>;

const getEventData = async (id: string) => {
  const rows = await db
    .select({
      event: events,
      timeSuggestion: timeSuggestions,
    })
    .from(events)
    .where(eq(events.id, id))
    .rightJoin(timeSuggestions, eq(timeSuggestions.eventId, id))
    .all();

  const result = rows.reduce<AggrecatedData>((acc, row) => {
    const { event, timeSuggestion } = row;

    if (!event) {
      return acc;
    }

    const { id } = event;

    if (!acc[id]) {
      acc[id] = { ...event, timeSuggestions: [] };
    }
    if (timeSuggestion) {
      acc[id].timeSuggestions.push(timeSuggestion);
    }
    return acc;
  }, {});

  return result[id];
};

type EventPageProps = {
  params: {
    id: string;
  };
};

export default async function Event({ params }: EventPageProps) {
  const { name, timeSuggestions } = await getEventData(params.id);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="card min-w-96 max-w-lg bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Event: {name}</h2>
        </div>
        <ul className="card-actions justify-center">
          {timeSuggestions.map(suggestion => (
            <li key={suggestion.id}>
              <button className="btn btn-ghost">
                {new Date(suggestion.time).toLocaleDateString()}
              </button>
            </li>
          ))}
        </ul>
        <ul></ul>
      </div>
    </main>
  );
}
