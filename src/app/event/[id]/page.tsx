import { db } from '@/db/db';

const getEventData = async (id: string) => {
  const result = await db.query.events.findFirst({
    where: (events, { eq }) => eq(events.id, id),
    with: {
      timeSuggestions: true,
    },
  });

  if (!result) {
    throw new Error('Event not found');
  }

  return result;
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
