import { EditSuggestionsModal } from '@/app/components/EditSuggestionModal';
import { EventDeleteModal } from '@/app/components/EventDeleteModal';
import { Shield } from '@/app/components/Shield';
import { VoteForm } from '@/app/components/VoteForm';
import {
  formatDate,
  getSuggestionsUsers,
  getUniqueVoters,
  orderDates,
} from '@/app/utils/utils';
import { db } from '@/db/db';
import clsx from 'clsx';
import Link from 'next/link';

const getEventData = async (id: string) => {
  const result = await db.query.events.findFirst({
    where: (events, { eq }) => eq(events.id, id),
    with: {
      timeSuggestions: true,
    },
  });

  return result;
};

type EventPageProps = {
  params: {
    id: string;
  };
};

export default async function Event({ params }: EventPageProps) {
  const event = await getEventData(params.id);

  if (!event) {
    return (
      <main>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold mb-4 font-accent dnd-heading">
            Event not found
          </h1>
          <Link className="btn btn-accent btn-sm max-w-28" href="/">
            Create one
          </Link>
        </div>
      </main>
    );
  }

  const { id, name, author, timeSuggestions } = event;

  const uniqueVoters = getUniqueVoters(timeSuggestions);
  const totalUniqueVoters = uniqueVoters.length;

  return (
    <main>
      <div className="card max-w-lg bg-base-100 shadow-xl shadow-stone-950">
        <div className="card-body items-center text-center">
          <p className="text-right w-full text-xs">Created by: {author}</p>

          <h1 className="capitalize text-3xl card-title dnd-heading">
            <span>{name}</span>
          </h1>

          <div className="card-actions justify-center flex-col items-center p-4 gap-4">
            <VoteForm
              suggestions={timeSuggestions}
              eventId={id}
              maxParticipants={event.maxParticipants ?? 0}
              totalUniqueVoters={totalUniqueVoters}
            />
            <div className="label">
              <span className="label-text">Selected dates</span>
            </div>
            <div className="flex flex-col gap-4">
              {orderDates(timeSuggestions, 'asc').map(suggestion => {
                const suggestionVoters = getSuggestionsUsers(suggestion.users);
                const percentage =
                  (suggestionVoters.length / totalUniqueVoters) * 100;
                const combinedVoters = suggestionVoters.join(' ∣ ');

                return (
                  <div key={suggestion.id} className="flex flex-col">
                    <div
                      data-tip={`voters: ${combinedVoters}`}
                      className={clsx(
                        'flex gap-4 items-center justify-between label-text',
                        {
                          tooltip: suggestion.users,
                          'tooltip-accent': suggestion.users,
                        }
                      )}
                    >
                      <span>{formatDate(suggestion.time)}</span>
                      <progress
                        className="progress progress-secondary w-32 sm:w-52"
                        value={percentage}
                        max={100}
                      />
                      <div className="flex gap-2 items-center">
                        <span>({suggestion.votes})</span>
                        <EditSuggestionsModal
                          suggestion={suggestion}
                          maxParticipants={event.maxParticipants ?? 0}
                          totalUniqueVoters={totalUniqueVoters}
                        />
                      </div>
                    </div>
                    {uniqueVoters.length > 0 ? (
                      <ul className="flex justify-center gap-2">
                        {uniqueVoters.map(voter => (
                          <li key={voter}>
                            <Shield>
                              {voter.substring(0, 2).toUpperCase()}
                            </Shield>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className="divider" />
            <EventDeleteModal id={id} />
          </div>
        </div>
      </div>
    </main>
  );
}
