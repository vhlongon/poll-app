import { VoteForm } from '@/app/components/VoteForm';
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
  const { name, id, timeSuggestions } = await getEventData(params.id);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="card min-w-96 max-w-lg bg-base-100 shadow-2xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{name}</h2>
        </div>
        <div className="card-actions justify-center flex-col items-center p-4">
          <VoteForm suggestions={timeSuggestions} eventId={id} />
        </div>
      </div>
    </main>
  );
}
