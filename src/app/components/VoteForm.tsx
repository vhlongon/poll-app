'use client';
import { TimeSuggestion } from '@/db/schema';
import { useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { addVotes } from '../actions/addVotes';
import { formatDate } from '../utils/utils';
import { Checkbox } from './Checkbox';
import { ErrorMessage } from './ErrorMessage';
import { Input } from './Input';

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      aria-disabled={pending}
      className="btn btn-success w-full"
      type="submit"
    >
      {pending ? (
        <>
          <span className="loading loading-spinner" />
          adding...
        </>
      ) : (
        <>Add Votes</>
      )}
    </button>
  );
};

type VoteFormProps = {
  suggestions: TimeSuggestion[];
  eventId: string;
};

export const VoteForm = ({ suggestions, eventId }: VoteFormProps) => {
  const [state, formAction] = useFormState(addVotes, undefined);
  const [errors, setError] = useState<Partial<typeof state> | undefined>(state);

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setError(undefined);

    const formData = new FormData(event.currentTarget);
    const hasSelectedDates = formData.getAll('suggestions').length > 0;

    if (!hasSelectedDates) {
      event.preventDefault();
      setError({
        suggestions: 'Choose at least 1 date',
      });
      return;
    }
  };

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-4 w-96"
      onSubmit={onSubmit}
    >
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Choose dates</span>
        </div>
        <fieldset name="suggestions" className="grid grid-cols-3 gap-4">
          {suggestions.map(suggestion => (
            <Checkbox
              key={suggestion.id}
              name="suggestions"
              value={suggestion.id}
            >
              {formatDate(suggestion.time)}
            </Checkbox>
          ))}
        </fieldset>
      </label>
      {errors?.suggestions && <ErrorMessage>{errors.suggestions}</ErrorMessage>}
      <Input
        required
        type="text"
        id="user"
        name="user"
        placeholder="Voter"
        label="Your name"
        className="input input-bordered w-full"
      />
      {errors?.user && <ErrorMessage>{errors.user}</ErrorMessage>}
      <input type="hidden" value={eventId} name="eventId" />
      <SubmitButton />
      {errors?.error && <ErrorMessage>{errors.error}</ErrorMessage>}
    </form>
  );
};
