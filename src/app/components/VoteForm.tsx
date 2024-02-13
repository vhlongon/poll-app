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
      className="btn btn-primary w-full"
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
  const [error, setError] = useState('');

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const hasSelectedDates = formData.getAll('suggestions').length > 0;

    if (!hasSelectedDates) {
      event.preventDefault();
      setError('Choose at least 1 date');
    } else {
      setError('');
    }
  };

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-4"
      onSubmit={onSubmit}
    >
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Choose Days</span>
        </div>
        <fieldset
          name="suggestions"
          className="grid grid-cols-2 sm:grid-cols-3 gap-4"
        >
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
      {state?.suggestions && <ErrorMessage>{state.suggestions}</ErrorMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Input
        required
        type="text"
        id="user"
        name="user"
        placeholder="Voter"
        label="Thy Name"
        className="input input-bordered w-full"
      />
      {state?.user && <ErrorMessage>{state.user}</ErrorMessage>}
      <input type="hidden" value={eventId} name="eventId" />
      <SubmitButton />
      {state?.error && <ErrorMessage>{state.error}</ErrorMessage>}
    </form>
  );
};
