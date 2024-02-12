'use client';
import { TimeSuggestion } from '@/db/schema';
import { useFormState, useFormStatus } from 'react-dom';
import { addVotes } from '../actions/addVotes';
import { Checkbox } from './Checkbox';
import { ErrorMessage } from './ErrorMessage';
import { useRef } from 'react';
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

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('en-GB').format(new Date(date));
};

export const VoteForm = ({ suggestions, eventId }: VoteFormProps) => {
  const [state, formAction] = useFormState(addVotes, undefined);

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-4 w-96"
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
      <Input
        required
        type="text"
        id="author"
        name="author"
        placeholder="Your name"
        className="input input-bordered w-full"
      />
      <input type="hidden" value={eventId} name="eventId" />
      {state?.suggestions && <ErrorMessage>{state.suggestions}</ErrorMessage>}
      <SubmitButton />
    </form>
  );
};
